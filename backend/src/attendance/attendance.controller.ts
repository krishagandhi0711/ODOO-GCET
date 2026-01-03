import { 
  Controller, 
  Get, 
  Post, 
  UseGuards, 
  Request,
  Param,
  ParseIntPipe,
  Query
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

/**
 * Attendance Controller
 * Handles check-in, check-out, and status tracking
 * The "Green Dot" logic lives here
 */
@Controller('attendance')
@UseGuards(JwtAuthGuard) // All routes require authentication
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  /**
   * Check-in for the day
   * Constraints:
   * - Cannot check in twice in one day
   * - Cannot check in if on approved leave
   * 
   * POST /attendance/check-in
   */
  @Post('check-in')
  async checkIn(@Request() req) {
    const result = await this.attendanceService.checkIn(req.user.userId);
    // Transform response for API compatibility
    return {
      ...result,
      check_in_time: result.check_in,
      check_out_time: result.check_out,
      worked_hours: result.total_hours
    };
  }

  /**
   * Check-out for the day
   * Calculates worked hours
   * 
   * POST /attendance/check-out
   */
  @Post('check-out')
  async checkOut(@Request() req) {
    const result = await this.attendanceService.checkOut(req.user.userId);
    // Transform response for API compatibility
    return {
      ...result,
      check_in_time: result.check_in,
      check_out_time: result.check_out,
      worked_hours: result.total_hours
    };
  }

  /**
   * Get real-time status (The "Green Dot" API)
   * Returns: { status, icon, message, canCheckIn, canCheckOut }
   * 
   * GET /attendance/status
   */
  @Get('status')
  getStatus(@Request() req) {
    return this.attendanceService.getTodayStatus(req.user.userId);
  }

  /**
   * Get attendance history
   * Employee: Own history
   * Admin/HR: All employees
   * 
   * GET /attendance/history
   */
  @Get('history')
  getHistory(@Request() req, @Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 30;
    return this.attendanceService.getAttendanceHistory(
      req.user.userId, 
      req.user.role,
      limitNum
    );
  }

  /**
   * Get attendance statistics
   * 
   * GET /attendance/statistics
   */
  @Get('statistics')
  getStatistics(@Request() req) {
    return this.attendanceService.getStatistics(req.user.userId, req.user.role);
  }

  /**
   * Get specific employee's attendance (Admin/HR only)
   * 
   * GET /attendance/employee/:id
   */
  @Get('employee/:id')
  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'HR')
  getEmployeeAttendance(
    @Param('id', ParseIntPipe) employeeId: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    
    return this.attendanceService.getEmployeeAttendance(employeeId, start, end);
  }
}
