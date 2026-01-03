import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes Prisma available everywhere without importing the module repeatedly
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Critical: Allows other modules to inject PrismaService
})
export class PrismaModule {}
