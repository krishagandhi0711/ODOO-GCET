import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { LeavesModule } from '../leaves/leaves.module'; // CRITICAL: Import to use LeavesService

@Module({
  imports: [
    PrismaModule, // For database access
    LeavesModule  // For leave constraint checking
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService] // Export for potential use in other modules
})
export class AttendanceModule {}
