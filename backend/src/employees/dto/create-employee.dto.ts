import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDateString, IsInt, IsEnum } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  job_position: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  marital_status?: string;

  @IsOptional()
  @IsInt()
  manager_id?: number;

  @IsOptional()
  @IsInt()
  company_id?: number;

  @IsOptional()
  @IsEnum(['ADMIN', 'HR', 'EMPLOYEE'])
  role?: 'ADMIN' | 'HR' | 'EMPLOYEE';

  // Private fields (Optional - Admin can set during creation)
  @IsOptional()
  @IsString()
  pan_no?: string;

  @IsOptional()
  @IsString()
  uan_no?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  love_about_job?: string;

  @IsOptional()
  @IsString()
  interests?: string;
}

