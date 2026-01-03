import { 
  Injectable, 
  BadRequestException, 
  ConflictException,
  NotFoundException 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LeavesService } from '../leaves/leaves.service';

@Injectable()
export class AttendanceService {
  constructor(
    private prisma: PrismaService,
    private leavesService: LeavesService // Inject LeavesService for constraint checking
  ) {}

  /**
   * THE CHECK-IN (With Multi-Layer Constraints)
   * This is the core "Green Dot" logic
   */
  async checkIn(userId: number) {
    // Step 1: Find Employee from User ID
    const employee = await this.prisma.employees.findFirst({ 
      where: { user_id: userId },
      include: {
        users: {
          select: {
            email: true
          }
        }
      }
    });

    if (!employee) {
      throw new BadRequestException('Employee profile not found');
    }

    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    // Step 2: CONSTRAINT 1 - Already Checked In Today?
    const existingCheckIn = await this.prisma.attendance_records.findFirst({
      where: {
        employee_id: employee.id,
        attendance_date: today,
        check_out: null // Still checked in
      }
    });

    if (existingCheckIn) {
      throw new ConflictException(
        'You have already checked in today. Please check out first.'
      );
    }

    // Step 3: CONSTRAINT 2 - Is Employee on Approved Leave? (The Airplane Block)
    const onLeave = await this.leavesService.isEmployeeOnLeave(employee.id, today);
    
    if (onLeave) {
      throw new ConflictException(
        '✈️ You are on approved leave today. No need to check in! Enjoy your break.'
      );
    }

    // Step 4: Create Attendance Record
    return this.prisma.attendance_records.create({
      data: {
        employee_id: employee.id,
        attendance_date: today,
        check_in: now,
        status: 'PRESENT'
      },
      select: {
        id: true,
        employee_id: true,
        attendance_date: true,
        check_in: true,
        check_out: true,
        total_hours: true,
        status: true,
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
   * THE CHECK-OUT
   * Calculates worked hours and updates record
   */
  async checkOut(userId: number) {
    // Find Employee
    const employee = await this.prisma.employees.findFirst({ 
      where: { user_id: userId } 
    });

    if (!employee) {
      throw new BadRequestException('Employee profile not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find Open Check-In (no check-out yet)
    const openRecord = await this.prisma.attendance_records.findFirst({
      where: {
        employee_id: employee.id,
        attendance_date: today,
        check_out: null
      },
      orderBy: { check_in: 'desc' }
    });

    if (!openRecord) {
      throw new BadRequestException(
        'No active check-in found for today. Please check in first.'
      );
    }

    const checkOutTime = new Date();
    
    // Calculate Hours Worked
    if (!openRecord.check_in) {
      throw new ConflictException('Invalid check-in record');
    }
    const checkInTime = new Date(openRecord.check_in);
    const diffMs = checkOutTime.getTime() - checkInTime.getTime();
    const hoursWorked = diffMs / (1000 * 60 * 60); // Convert to hours

    return this.prisma.attendance_records.update({
      where: { id: openRecord.id },
      data: {
        check_out: checkOutTime,
        total_hours: parseFloat(hoursWorked.toFixed(2)),
        status: 'PRESENT' // Marked as present after successful day
      },
      select: {
        id: true,
        employee_id: true,
        attendance_date: true,
        check_in: true,
        check_out: true,
        total_hours: true,
        status: true,
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
   * THE "GREEN DOT" STATUS API
   * Returns real-time status for dashboard
   * Returns: { status: 'PRESENT'|'ON_LEAVE'|'ABSENT', icon: '🟢'|'✈️'|'🟡', details: {...} }
   */
  async getTodayStatus(userId: number) {
    const employee = await this.prisma.employees.findFirst({ 
      where: { user_id: userId },
      select: {
        id: true,
        full_name: true,
        employee_code: true
      }
    });

    if (!employee) {
      return { 
        status: 'UNKNOWN', 
        icon: '❓',
        message: 'Employee profile not found'
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Priority 1: Check if on leave
    const onLeave = await this.leavesService.isEmployeeOnLeave(employee.id, today);
    
    if (onLeave) {
      return { 
        status: 'ON_LEAVE', 
        icon: '✈️',
        message: 'You are on approved leave today',
        canCheckIn: false
      };
    }

    // Priority 2: Check attendance record
    const attendance = await this.prisma.attendance_records.findFirst({
      where: {
        employee_id: employee.id,
        attendance_date: today
      },
      orderBy: { check_in: 'desc' }
    });

    if (attendance) {
      if (!attendance.check_out) {
        // Still checked in
        return {
          status: 'PRESENT',
          icon: '🟢',
          message: 'You are currently checked in',
          checkInTime: attendance.check_in,
          canCheckIn: false,
          canCheckOut: true
        };
      } else {
        // Already checked out
        return {
          status: 'COMPLETED',
          icon: '✅',
          message: 'You have completed your day',
          checkInTime: attendance.check_in,
          checkOutTime: attendance.check_out,
          hoursWorked: attendance.total_hours,
          canCheckIn: false,
          canCheckOut: false
        };
      }
    }

    // Priority 3: Not checked in yet
    return {
      status: 'ABSENT',
      icon: '🟡',
      message: 'You have not checked in today',
      canCheckIn: true,
      canCheckOut: false
    };
  }

  /**
   * Get attendance history
   * For employee dashboard and admin reports
   */
  async getAttendanceHistory(userId: number, role: string, limit = 30) {
    if (role === 'ADMIN' || role === 'HR') {
      // Admin can see all attendance
      return this.prisma.attendance_records.findMany({
        include: {
          employees: {
            select: {
              full_name: true,
              employee_code: true,
              department: true
            }
          }
        },
        orderBy: { attendance_date: 'desc' },
        take: limit
      });
    } else {
      // Employee sees only their own
      const employee = await this.prisma.employees.findFirst({
        where: { user_id: userId }
      });

      if (!employee) {
        return [];
      }

      return this.prisma.attendance_records.findMany({
        where: { employee_id: employee.id },
        orderBy: { attendance_date: 'desc' },
        take: limit
      });
    }
  }

  /**
   * Get specific employee's attendance by ID (Admin only)
   */
  async getEmployeeAttendance(employeeId: number, startDate?: Date, endDate?: Date) {
    const where: any = { employee_id: employeeId };

    if (startDate || endDate) {
      where.attendance_date = {};
      if (startDate) where.attendance_date.gte = startDate;
      if (endDate) where.attendance_date.lte = endDate;
    }

    return this.prisma.attendance_records.findMany({
      where,
      include: {
        employees: {
          select: {
            full_name: true,
            employee_code: true,
            department: true
          }
        }
      },
      orderBy: { attendance_date: 'desc' }
    });
  }

  /**
   * Get attendance statistics
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

    const [totalDays, presentDays, avgHours] = await Promise.all([
      this.prisma.attendance_records.count({ where: whereClause }),
      this.prisma.attendance_records.count({ 
        where: { ...whereClause, status: 'PRESENT' } 
      }),
      this.prisma.attendance_records.aggregate({
        where: { ...whereClause, total_hours: { not: null } },
        _avg: { total_hours: true }
      })
    ]);

    return {
      totalDays,
      presentDays,
      averageHoursPerDay: avgHours._avg?.total_hours?.toFixed(2) || 0,
      attendanceRate: totalDays > 0 
        ? ((presentDays / totalDays) * 100).toFixed(2) 
        : 0
    };
  }
}
