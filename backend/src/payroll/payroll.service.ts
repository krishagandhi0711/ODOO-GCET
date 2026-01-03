import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/**
 * Payroll Service - The Calculator
 * This is the "Business Tool" that transforms attendance data into money.
 * 
 * Key Features:
 * - Computes payslip on-the-fly (no stored payroll records)
 * - Automatically deducts for unpaid leaves
 * - Calculates PF, HRA, and other components based on standard rules
 */
@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  /**
   * The Core Calculator Function
   * Generates a computed payslip for an employee for a specific month/year
   * 
   * @param employeeId - Employee ID
   * @param month - Month (1-12)
   * @param year - Year (e.g., 2026)
   * @returns Computed payslip with all earnings, deductions, and net salary
   */
  async generatePayslip(employeeId: number, month: number, year: number) {
    // Validation
    if (month < 1 || month > 12) {
      throw new BadRequestException('Month must be between 1 and 12');
    }
    if (year < 2020 || year > 2100) {
      throw new BadRequestException('Invalid year');
    }

    // 1. Fetch Employee & Salary Structure
    const employee = await this.prisma.employees.findUnique({
      where: { id: employeeId },
      include: {
        salary_structures: true
      }
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    if (!employee.salary_structures || !employee.salary_structures.monthly_wage) {
      throw new NotFoundException(
        'Salary structure not configured for this employee. Please set monthly wage first.'
      );
    }

    const wage = parseFloat(employee.salary_structures.monthly_wage.toString());

    // 2. Calculate Standard Components (Fixed Rules)
    // Industry Standard: Basic = 50% of CTC, HRA = 50% of Basic
    const basic = wage * 0.50;
    const hra = basic * 0.50;
    const specialAllowance = wage - (basic + hra); // Balancing figure

    // Deductions (Standard Rules)
    const pf = basic * 0.12; // 12% Employee PF contribution
    const professionalTax = 200; // Fixed flat rate (₹200/month)

    // 3. The "Dayflow Integration": Check Unpaid Leaves
    // Count APPROVED UNPAID leaves in this month
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0); // Last day of month

    const unpaidLeaves = await this.prisma.leave_requests.findMany({
      where: {
        employee_id: employeeId,
        leave_type: 'UNPAID',
        status: 'APPROVED',
        OR: [
          {
            // Leave starts in this month
            start_date: {
              gte: startOfMonth,
              lte: endOfMonth
            }
          },
          {
            // Leave ends in this month
            end_date: {
              gte: startOfMonth,
              lte: endOfMonth
            }
          },
          {
            // Leave spans across this month
            AND: [
              { start_date: { lte: startOfMonth } },
              { end_date: { gte: endOfMonth } }
            ]
          }
        ]
      }
    });

    // Calculate total unpaid leave days in this month
    let totalUnpaidDays = 0;
    for (const leave of unpaidLeaves) {
      if (!leave.start_date || !leave.end_date) continue; // Skip invalid leaves
      
      const leaveStart = leave.start_date > startOfMonth ? leave.start_date : startOfMonth;
      const leaveEnd = leave.end_date < endOfMonth ? leave.end_date : endOfMonth;
      
      const daysDiff = Math.floor((leaveEnd.getTime() - leaveStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      totalUnpaidDays += daysDiff;
    }

    // 4. Calculate Final Deduction
    const totalDaysInMonth = new Date(year, month, 0).getDate(); // e.g., 30 or 31
    const dailyWage = wage / totalDaysInMonth;
    const leaveDeduction = dailyWage * totalUnpaidDays;

    // 5. Final Net Salary
    const grossSalary = wage - leaveDeduction;
    const totalDeductions = pf + professionalTax + leaveDeduction;
    const netSalary = grossSalary - pf - professionalTax;

    // Return the "Virtual" Payslip Object
    return {
      employee: {
        id: employee.id,
        name: employee.full_name || 'N/A',
        code: employee.employee_code || 'N/A',
        department: employee.department || 'N/A',
        designation: employee.job_position || 'N/A'
      },
      period: {
        month,
        year,
        display: `${this.getMonthName(month)} ${year}`
      },
      earnings: {
        basic: Math.round(basic),
        hra: Math.round(hra),
        special_allowance: Math.round(specialAllowance),
        total: Math.round(wage)
      },
      deductions: {
        pf: Math.round(pf),
        professional_tax: professionalTax,
        leave_deduction: Math.round(leaveDeduction), // The dynamic part!
        total: Math.round(totalDeductions)
      },
      summary: {
        gross_earning: Math.round(grossSalary),
        total_deduction: Math.round(totalDeductions),
        net_payable: Math.round(netSalary), // This is what goes to bank
        currency: 'INR'
      },
      stats: {
        unpaid_leave_days: totalUnpaidDays,
        total_working_days: totalDaysInMonth,
        effective_working_days: totalDaysInMonth - totalUnpaidDays,
        daily_wage: Math.round(dailyWage)
      }
    };
  }

  /**
   * Get payslip for the current month
   */
  async getCurrentMonthPayslip(employeeId: number) {
    const now = new Date();
    return this.generatePayslip(employeeId, now.getMonth() + 1, now.getFullYear());
  }

  /**
   * Get payslip history for an employee
   */
  async getPayslipHistory(employeeId: number, limit: number = 6) {
    const now = new Date();
    const payslips: any[] = [];
    
    for (let i = 0; i < limit; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      try {
        const payslip = await this.generatePayslip(
          employeeId,
          date.getMonth() + 1,
          date.getFullYear()
        );
        payslips.push(payslip);
      } catch (error) {
        // Skip months where salary structure wasn't configured
        continue;
      }
    }
    
    return payslips;
  }

  /**
   * Helper function to get month name
   */
  private getMonthName(month: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1];
  }
}
