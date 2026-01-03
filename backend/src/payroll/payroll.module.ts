import { Module } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { PayrollController } from './payroll.controller';
import { PrismaModule } from '../prisma/prisma.module';

/**
 * Payroll Module - The Business Calculator
 * Transforms attendance and leave data into computed payslips
 * 
 * No payroll data is stored - everything is calculated on-demand
 */
@Module({
  imports: [PrismaModule],
  providers: [PayrollService],
  controllers: [PayrollController],
  exports: [PayrollService] // Export for potential future integrations
})
export class PayrollModule {}
