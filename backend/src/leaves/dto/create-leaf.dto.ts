import { IsNotEmpty, IsDateString, IsEnum, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateLeaveDto {
  @IsEnum(['PAID', 'SICK', 'UNPAID'])
  @IsNotEmpty()
  type: 'PAID' | 'SICK' | 'UNPAID';

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsOptional()
  @IsInt()
  employee_id?: number; // For admin creating leave on behalf of employee
}
