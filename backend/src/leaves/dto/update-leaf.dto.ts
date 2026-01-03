import { IsEnum, IsOptional } from 'class-validator';

export class UpdateLeaveStatusDto {
  @IsEnum(['APPROVED', 'REJECTED'])
  status: 'APPROVED' | 'REJECTED';

  @IsOptional()
  @IsEnum(['PAID', 'SICK', 'CASUAL', 'UNPAID'])
  type?: 'PAID' | 'SICK' | 'CASUAL' | 'UNPAID';
}
