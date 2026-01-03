import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmployeesModule } from './employees/employees.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeavesModule } from './leaves/leaves.module';

@Module({
  imports: [PrismaModule, AuthModule, EmployeesModule, AttendanceModule, LeavesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
