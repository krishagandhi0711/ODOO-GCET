import { Module } from '@nestjs/common';
import { LeavesService } from './leaves.service';
import { LeavesController } from './leaves.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule], // Import PrismaModule for database access
  controllers: [LeavesController],
  providers: [LeavesService],
  exports: [LeavesService], // Export for use in AttendanceModule
})
export class LeavesModule {}
