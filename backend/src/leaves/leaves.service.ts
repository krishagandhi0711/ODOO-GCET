import { 
  Injectable, 
  ConflictException, 
  NotFoundException,
  BadRequestException 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLeaveDto } from './dto/create-leaf.dto';
import { UpdateLeaveStatusDto } from './dto/update-leaf.dto';

@Injectable()
export class LeavesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Apply for leave with overlap checking
   * Employees can apply for their own leave
   * Admins can apply on behalf of employees
   */
  async applyLeave(userId: number, createLeaveDto: CreateLeaveDto) {
    // Find employee from user ID or use provided employee_id (for admin)
    let employeeId = createLeaveDto.employee_id;
    
    if (!employeeId) {
      const employee = await this.prisma.employees.findFirst({
        where: { user_id: userId }
      });
      
      if (!employee) {
        throw new BadRequestException('Employee profile not found');
      }
      
      employeeId = employee.id;
    }

    const startDate = new Date(createLeaveDto.start_date);
    const endDate = new Date(createLeaveDto.end_date);
    
    // Strip time component for date-only comparison
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
    
    // Strip time for date-only comparison
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    // Validate dates
    if (endDate < startDate) {
      throw new BadRequestException('End date cannot be before start date');
    }

    // Constraint 1: Check for overlapping leave requests
    const existingLeave = await this.prisma.leave_requests.findFirst({
      where: {
        employee_id: employeeId,
        start_date: { lte: endDate },
        end_date: { gte: startDate },
        status: { in: ['PENDING', 'APPROVED'] }
      }
    });

    if (existingLeave) {
      throw new ConflictException(
        'Leave request overlaps with an existing request. Please choose different dates.'
      );
    }

    // Constraint 2: Cannot apply leave for dates where attendance exists
    const attendanceExists = await this.prisma.attendance_records.findFirst({
      where: {
        employee_id: employeeId,
        attendance_date: {
          gte: startDate,
          lte: endDate
        }
      }
    });

    if (attendanceExists) {
      throw new ConflictException(
        'You already have attendance records for these dates. Cannot apply leave retroactively.'
      );
    }

    // Create leave request
    return this.prisma.leave_requests.create({
      data: {
        employee_id: employeeId,
        leave_type: createLeaveDto.type,
        start_date: startDate,
        end_date: endDate,
        reason: createLeaveDto.reason,
        status: 'PENDING',
        applied_at: new Date()
      },
      include: {
        employees: {
          select: {
            full_name: true,
            employee_code: true,
            department: true
          }
        }
      }
    });
  }

  /**
   * Get all leave requests (for admin/HR)
   * Or get employee's own leave requests
   */
  async findAll(userId: number, role: string) {
    // If admin/HR, show all. Otherwise show only employee's own
    if (role === 'ADMIN' || role === 'HR') {
      return this.prisma.leave_requests.findMany({
        include: {
          employees: {
            select: {
              full_name: true,
              employee_code: true,
              department: true,
              users: {
                select: {
                  email: true
                }
              }
            }
          }
        },
        orderBy: {
          applied_at: 'desc'
        }
      });
    } else {
      // Employee - show only their leaves
      const employee = await this.prisma.employees.findFirst({
        where: { user_id: userId }
      });

      if (!employee) {
        return [];
      }

      return this.prisma.leave_requests.findMany({
        where: { employee_id: employee.id },
        orderBy: {
          applied_at: 'desc'
        }
      });
    }
  }

  /**
   * Get single leave request
   */
  async findOne(id: number) {
    const leave = await this.prisma.leave_requests.findUnique({
      where: { id },
      include: {
        employees: {
          select: {
            full_name: true,
            employee_code: true,
            department: true,
            job_position: true,
            users: {
              select: {
                email: true
              }
            }
          }
        }
      }
    });

    if (!leave) {
      throw new NotFoundException(`Leave request with ID ${id} not found`);
    }

    return leave;
  }

  /**
   * Approve or Reject leave (Admin/HR only)
   */
  async updateStatus(id: number, updateDto: UpdateLeaveStatusDto) {
    const leave = await this.findOne(id);

    // Cannot change status of already processed leave
    if (leave.status !== 'PENDING') {
      throw new ConflictException(
        `This leave request has already been ${leave.status?.toLowerCase() || 'processed'}`
      );
    }

    return this.prisma.leave_requests.update({
      where: { id },
      data: {
        status: updateDto.status,
        ...(updateDto.type && { leave_type: updateDto.type as 'PAID' | 'SICK' | 'UNPAID' })
      },
      include: {
        employees: {
          select: {
            full_name: true,
            employee_code: true
          }
        }
      }
    });
  }

  /**
   * Cancel leave request (Employee can cancel their own pending leave)
   */
  async cancel(id: number, userId: number) {
    const leave = await this.findOne(id);
    
    // Check if user owns this leave
    const employee = await this.prisma.employees.findFirst({
      where: { user_id: userId }
    });

    if (leave.employee_id !== employee?.id) {
      throw new BadRequestException('You can only cancel your own leave requests');
    }

    if (leave.status !== 'PENDING') {
      throw new ConflictException('Can only cancel pending leave requests');
    }

    return this.prisma.leave_requests.update({
      where: { id },
      data: { status: 'REJECTED' }
    });
  }

  /**
   * CRITICAL HELPER: Check if employee is on approved leave for a specific date
   * Used by Attendance module to prevent check-in during leave
   */
  async isEmployeeOnLeave(employeeId: number, date: Date): Promise<boolean> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const record = await this.prisma.leave_requests.findFirst({
      where: {
        employee_id: employeeId,
        status: 'APPROVED',
        start_date: { lte: endOfDay },
        end_date: { gte: startOfDay }
      }
    });

    return !!record; // Returns true if on leave
  }

  /**
   * Get leave statistics for dashboard
   */
  async getStatistics(userId: number, role: string) {
    let whereClause = {};

    if (role !== 'ADMIN' && role !== 'HR') {
      const employee = await this.prisma.employees.findFirst({
        where: { user_id: userId }
      });
      if (employee) {
        whereClause = { employee_id: employee.id };
      }
    }

    const [total, pending, approved, rejected] = await Promise.all([
      this.prisma.leave_requests.count({ where: whereClause }),
      this.prisma.leave_requests.count({ 
        where: { ...whereClause, status: 'PENDING' } 
      }),
      this.prisma.leave_requests.count({ 
        where: { ...whereClause, status: 'APPROVED' } 
      }),
      this.prisma.leave_requests.count({ 
        where: { ...whereClause, status: 'REJECTED' } 
      })
    ]);

    return {
      total,
      pending,
      approved,
      rejected
    };
  }
}
