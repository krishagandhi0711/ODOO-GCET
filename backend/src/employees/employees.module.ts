import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule to use PrismaService
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService], // Export for use in other modules
})
export class EmployeesModule {}
