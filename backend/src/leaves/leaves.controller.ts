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
import { LeavesService } from './leaves.service';
import { CreateLeaveDto } from './dto/create-leaf.dto';
import { UpdateLeaveStatusDto } from './dto/update-leaf.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

/**
 * Leave Management Controller
 * Handles leave applications, approvals, and cancellations
 */
@Controller('leaves')
@UseGuards(JwtAuthGuard) // All routes require authentication
export class LeavesController {
  constructor(private readonly leavesService: LeavesService) {}

  /**
   * Apply for leave
   * Employees can apply for their own leave
   * Checks for overlaps and attendance conflicts
   * 
   * POST /leaves
   */
  @Post()
  async apply(@Request() req, @Body() createLeaveDto: CreateLeaveDto) {
    const result = await this.leavesService.applyLeave(req.user.userId, createLeaveDto);
    // Transform response for API compatibility
    return {
      ...result,
      type: result.leave_type
    };
  }

  /**
   * Get all leave requests
   * ADMIN/HR: See all leaves
   * Employee: See only their leaves
   * 
   * GET /leaves
   */
  @Get()
  findAll(@Request() req) {
    return this.leavesService.findAll(req.user.userId, req.user.role);
  }

  /**
   * Get leave statistics
   * 
   * GET /leaves/statistics
   */
  @Get('statistics')
  getStatistics(@Request() req) {
    return this.leavesService.getStatistics(req.user.userId, req.user.role);
  }

  /**
   * Get specific leave request details
   * 
   * GET /leaves/:id
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leavesService.findOne(id);
  }

  /**
   * Approve or reject leave (ADMIN/HR only)
   * Changes status from PENDING to APPROVED or REJECTED
   * 
   * PATCH /leaves/:id/status
   */
  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'HR')
  updateStatus(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateDto: UpdateLeaveStatusDto
  ) {
    return this.leavesService.updateStatus(id, updateDto);
  }

  /**
   * Cancel own leave request
   * Employees can cancel their pending leaves
   * 
   * DELETE /leaves/:id
   */
  @Delete(':id')
  cancel(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.leavesService.cancel(id, req.user.userId);
  }
}
