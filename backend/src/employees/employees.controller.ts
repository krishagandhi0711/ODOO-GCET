import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Request,
  ParseIntPipe 
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

/**
 * Employee Controller
 * Handles all employee-related operations with role-based access control
 * All endpoints require JWT authentication
 */
@Controller('employees')
@UseGuards(JwtAuthGuard) // All routes require authentication
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * Create new employee (ADMIN and HR only)
   * Creates both User account and Employee profile atomically
   * Returns employee with auto-generated employee code
   * 
   * POST /employees
   * Body: CreateEmployeeDto
   */
  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'HR')
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  /**
   * Get all employees (ADMIN and HR only)
   * Returns employee directory with basic info
   * 
   * GET /employees
   */
  @Get()
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'HR')
  findAll() {
    return this.employeesService.findAll();
  }

  /**
   * Get employee statistics (ADMIN only)
   * Returns counts by department, role, etc.
   * 
   * GET /employees/statistics
   */
  @Get('statistics')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  getStatistics() {
    return this.employeesService.getStatistics();
  }

  /**
   * Get logged-in user's employee profile
   * Any authenticated user can access their own profile
   * 
   * GET /employees/me
   */
  @Get('me')
  getMyProfile(@Request() req) {
    // req.user comes from JWT token (set by JwtStrategy)
    return this.employeesService.findByUserId(req.user.userId);
  }

  /**
   * Get specific employee by ID (ADMIN and HR only)
   * Returns complete employee profile
   * 
   * GET /employees/:id
   */
  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'HR')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.findOne(id);
  }

  /**
   * Update employee information (ADMIN and HR only)
   * Cannot update immutable fields (employee_code, user_id)
   * 
   * PATCH /employees/:id
   * Body: UpdateEmployeeDto
   */
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'HR')
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  /**
   * Delete/deactivate employee (ADMIN only)
   * Removes employee record (consider soft delete in production)
   * 
   * DELETE /employees/:id
   */
  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeesService.remove(id);
  }
}
