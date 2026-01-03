import { 
  Controller, 
  Get, 
  Param, 
  Query, 
  UseGuards, 
  Request,
  ParseIntPipe,
  BadRequestException
} from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

/**
 * Payroll Controller - The Money API
 * Handles payslip generation with role-based access control
 * 
 * Security Model:
 * - Employees can only see their own payslips
 * - Admin/HR can see anyone's payslip
 */
@Controller('payroll')
@UseGuards(JwtAuthGuard) // All routes require authentication
export class PayrollController {
  constructor(private readonly payrollService: PayrollService) {}

  /**
   * Get My Payslip (Employee Self-Service)
   * Any authenticated employee can get their own payslip
   * 
   * GET /payroll/me?month=1&year=2026
   * GET /payroll/me/current (for current month)
   */
  @Get('me/current')
  async getMyCurrentPayslip(@Request() req) {
    // Find employee by user_id
    const employee = await this.findEmployeeByUserId(req.user.userId);
    return this.payrollService.getCurrentMonthPayslip(employee.id);
  }

  @Get('me/history')
  async getMyPayslipHistory(@Request() req, @Query('limit') limit?: string) {
    const employee = await this.findEmployeeByUserId(req.user.userId);
    const limitNum = limit ? parseInt(limit) : 6;
    return this.payrollService.getPayslipHistory(employee.id, limitNum);
  }

  @Get('me')
  async getMyPayslip(
    @Request() req,
    @Query('month') month?: string,
    @Query('year') year?: string
  ) {
    if (!month || !year) {
      throw new BadRequestException('Month and year are required query parameters');
    }

    // Find employee by user_id
    const employee = await this.findEmployeeByUserId(req.user.userId);
    return this.payrollService.generatePayslip(employee.id, +month, +year);
  }

  /**
   * Get Any Employee's Payslip (Admin Only)
   * Only ADMIN or HR can access this endpoint
   * 
   * GET /payroll/:employeeId?month=1&year=2026
   * GET /payroll/:employeeId/current
   */
  @Get(':employeeId/current')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'HR')
  async getEmployeeCurrentPayslip(@Param('employeeId', ParseIntPipe) id: number) {
    return this.payrollService.getCurrentMonthPayslip(id);
  }

  @Get(':employeeId/history')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'HR')
  async getEmployeePayslipHistory(
    @Param('employeeId', ParseIntPipe) id: number,
    @Query('limit') limit?: string
  ) {
    const limitNum = limit ? parseInt(limit) : 6;
    return this.payrollService.getPayslipHistory(id, limitNum);
  }

  @Get(':employeeId')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'HR')
  async getEmployeePayslip(
    @Param('employeeId', ParseIntPipe) id: number,
    @Query('month') month?: string,
    @Query('year') year?: string
  ) {
    if (!month || !year) {
      throw new BadRequestException('Month and year are required query parameters');
    }

    return this.payrollService.generatePayslip(id, +month, +year);
  }

  /**
   * Helper: Find employee by user_id
   * This connects the authenticated user to their employee profile
   */
  private async findEmployeeByUserId(userId: number) {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const employee = await prisma.employees.findFirst({
      where: { user_id: userId }
    });

    if (!employee) {
      throw new BadRequestException('Employee profile not found for this user');
    }

    await prisma.$disconnect();
    return employee;
  }
}
