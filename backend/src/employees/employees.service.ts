import { 
  Injectable, 
  ConflictException, 
  InternalServerErrorException,
  NotFoundException,
  BadRequestException 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generate auto-incremented employee code in format: ODOO-DH-YYYY-XXX
   * Example: ODOO-DH-2026-001, ODOO-DH-2026-002
   */
  private async generateEmployeeCode(): Promise<string> {
    const year = new Date().getFullYear();
    
    // Get count of employees to determine next sequence number
    const count = await this.prisma.employees.count();
    
    // Pad with zeros: 1 -> 001, 12 -> 012, 123 -> 123
    const sequence = (count + 1).toString().padStart(3, '0');
    
    return `ODOO-DH-${year}-${sequence}`;
  }

  /**
   * Create employee with atomic transaction
   * Creates both User account and Employee profile in single transaction
   * If either fails, both are rolled back
   */
  async create(createEmployeeDto: CreateEmployeeDto) {
    // Use provided password or default
    const password = createEmployeeDto.password || 'Welcome@123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Build full name from first_name and last_name, or use legacy full_name
    const fullName = createEmployeeDto.first_name && createEmployeeDto.last_name
      ? `${createEmployeeDto.first_name} ${createEmployeeDto.last_name}`
      : createEmployeeDto.full_name;

    if (!fullName) {
      throw new BadRequestException('Either first_name/last_name or full_name is required');
    }

    // Use phone_number or mobile
    const phoneNumber = createEmployeeDto.phone_number || createEmployeeDto.mobile;

    try {
      return await this.prisma.$transaction(async (tx) => {
        // Step 1: Find or use default role
        const roleName = createEmployeeDto.role || 'EMPLOYEE';
        const role = await tx.roles.findUnique({
          where: { name: roleName as any },
        });

        if (!role) {
          throw new BadRequestException(`Role ${roleName} not found`);
        }

        // Step 2: Generate employee code
        const employeeCode = await this.generateEmployeeCode();

        // Step 3: Generate login_id from employee code (ODOO-DH-2026-001 -> dh2026001)
        const loginId = employeeCode
          .replace('ODOO-DH-', 'dh')
          .replace(/-/g, '')
          .toLowerCase();

        // Step 4: Create User account
        const newUser = await tx.users.create({
          data: {
            login_id: loginId,
            email: createEmployeeDto.email,
            password: hashedPassword,
            role_id: role.id,
            company_id: createEmployeeDto.company_id || null,
            is_first_login: true, // User must change password on first login
          },
        });

        // Step 5: Create Employee profile linked to User
        const newEmployee = await tx.employees.create({
          data: {
            user_id: newUser.id,
            company_id: createEmployeeDto.company_id || null,
            
            // Handle both new and legacy name fields
            first_name: createEmployeeDto.first_name || null,
            last_name: createEmployeeDto.last_name || null,
            full_name: fullName,
            
            // Handle both phone field variants
            phone_number: createEmployeeDto.phone_number || null,
            mobile: phoneNumber || null,
            
            // Copy email from user
            email: createEmployeeDto.email,
            
            // Handle date of birth (multiple field names)
            date_of_birth: createEmployeeDto.date_of_birth 
              ? new Date(createEmployeeDto.date_of_birth) 
              : null,
            dob: createEmployeeDto.date_of_birth 
              ? new Date(createEmployeeDto.date_of_birth) 
              : (createEmployeeDto.dob ? new Date(createEmployeeDto.dob) : null),
            
            // Basic employee details
            gender: createEmployeeDto.gender || null,
            department: createEmployeeDto.department || null,
            
            // Handle both designation variants
            designation: createEmployeeDto.designation || null,
            job_position: createEmployeeDto.designation || createEmployeeDto.job_position || null,
            
            employee_code: employeeCode, // Auto-generated code
            employment_type: createEmployeeDto.employment_type || null,
            
            date_of_joining: createEmployeeDto.date_of_joining 
              ? new Date(createEmployeeDto.date_of_joining) 
              : new Date(),
            
            // Optional fields
            location: createEmployeeDto.location || null,
            address: createEmployeeDto.address || null,
            nationality: createEmployeeDto.nationality || null,
            marital_status: createEmployeeDto.marital_status || null,
            manager_id: createEmployeeDto.manager_id || null,
            pan_no: createEmployeeDto.pan_no || null,
            uan_no: createEmployeeDto.uan_no || null,
            about: createEmployeeDto.about || null,
            love_about_job: createEmployeeDto.love_about_job || null,
            interests: createEmployeeDto.interests || null,
          },
          include: {
            users: {
              select: {
                id: true,
                email: true,
                login_id: true,
                is_first_login: true,
                roles: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            companies: {
              select: {
                id: true,
                name: true,
                prefix: true,
              },
            },
          },
        });

        return {
          ...newEmployee,
          defaultPassword: password, // Return password to admin (to be shared with employee)
        };
      });
    } catch (error) {
      // Handle unique constraint violations
      if (error.code === 'P2002') {
        const target = error.meta?.target;
        if (target?.includes('email')) {
          throw new ConflictException('Email already exists');
        }
        if (target?.includes('login_id')) {
          throw new ConflictException('Login ID already exists');
        }
        throw new ConflictException('Unique constraint violation');
      }
      
      // Re-throw known exceptions
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error;
      }
      
      // Log and throw internal server error for unknown issues
      console.error('Employee creation error:', error);
      throw new InternalServerErrorException('Could not create employee');
    }
  }

  /**
   * Get all employees with their user details
   * For admin dashboard and employee directory
   */
  async findAll() {
    return this.prisma.employees.findMany({
      include: {
        users: {
          select: {
            email: true,
            login_id: true,
            is_first_login: true,
            roles: {
              select: {
                name: true,
              },
            },
          },
        },
        companies: {
          select: {
            name: true,
            prefix: true,
          },
        },
        employees: { // Manager relation
          select: {
            full_name: true,
            employee_code: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  /**
   * Get single employee by employee ID
   */
  async findOne(id: number) {
    const employee = await this.prisma.employees.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            email: true,
            login_id: true,
            is_first_login: true,
            created_at: true,
            roles: {
              select: {
                name: true,
              },
            },
          },
        },
        companies: {
          select: {
            id: true,
            name: true,
            prefix: true,
            logo_url: true,
          },
        },
        employees: { // Manager
          select: {
            id: true,
            full_name: true,
            employee_code: true,
            job_position: true,
          },
        },
        attendance_records: {
          take: 10,
          orderBy: {
            attendance_date: 'desc',
          },
        },
        leave_requests: {
          take: 5,
          orderBy: {
            applied_at: 'desc',
          },
        },
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  /**
   * Find employee by user ID
   * Used for /me endpoint to get logged-in user's employee profile
   */
  async findByUserId(userId: number) {
    const employee = await this.prisma.employees.findFirst({
      where: { user_id: userId },
      include: {
        users: {
          select: {
            email: true,
            login_id: true,
            is_first_login: true,
            roles: {
              select: {
                name: true,
              },
            },
          },
        },
        companies: {
          select: {
            id: true,
            name: true,
            prefix: true,
            logo_url: true,
          },
        },
        employees: { // Manager
          select: {
            id: true,
            full_name: true,
            employee_code: true,
            job_position: true,
            users: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee profile not found for this user');
    }

    return employee;
  }

  /**
   * Update employee information
   * Cannot update user_id or employee_code (immutable fields)
   */
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    // Check if employee exists
    await this.findOne(id);

    try {
      // If email is being updated, update it in users table as well
      if (updateEmployeeDto.email) {
        const employee = await this.prisma.employees.findUnique({
          where: { id },
          select: { user_id: true },
        });

        if (employee?.user_id) {
          await this.prisma.users.update({
            where: { id: employee.user_id },
            data: { email: updateEmployeeDto.email },
          });
        }
      }

      // Update employee data
      const { email, role, password, ...employeeData } = updateEmployeeDto;

      // Build full_name if first_name or last_name provided
      const fullName = updateEmployeeDto.first_name && updateEmployeeDto.last_name
        ? `${updateEmployeeDto.first_name} ${updateEmployeeDto.last_name}`
        : undefined;

      return await this.prisma.employees.update({
        where: { id },
        data: {
          ...employeeData,
          full_name: fullName || employeeData.full_name,
          mobile: updateEmployeeDto.phone_number || employeeData.mobile,
          job_position: updateEmployeeDto.designation || employeeData.job_position,
          dob: updateEmployeeDto.date_of_birth 
            ? new Date(updateEmployeeDto.date_of_birth) 
            : (updateEmployeeDto.dob ? new Date(updateEmployeeDto.dob) : undefined),
          date_of_birth: updateEmployeeDto.date_of_birth 
            ? new Date(updateEmployeeDto.date_of_birth) 
            : undefined,
        },
        include: {
          users: {
            select: {
              email: true,
              login_id: true,
              roles: {
                select: {
                  name: true,
                },
              },
            },
          },
          companies: {
            select: {
              name: true,
              prefix: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('Could not update employee');
    }
  }

  /**
   * Soft delete employee (deactivate)
   * In production, you might want to set a deleted_at field instead
   */
  async remove(id: number) {
    await this.findOne(id); // Check if exists

    return this.prisma.employees.delete({
      where: { id },
    });
  }

  /**
   * Get employee statistics
   * Useful for dashboard
   */
  async getStatistics() {
    const [total, byDepartment, byRole] = await Promise.all([
      this.prisma.employees.count(),
      this.prisma.employees.groupBy({
        by: ['department'],
        _count: true,
      }),
      this.prisma.employees.groupBy({
        by: ['job_position'],
        _count: true,
      }),
    ]);

    return {
      total,
      byDepartment,
      byRole,
    };
  }
}
