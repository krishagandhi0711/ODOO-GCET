import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDateString, IsInt, IsEnum } from 'class-validator';

export class CreateEmployeeDto {
  // User credentials
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsEnum(['ADMIN', 'HR', 'EMPLOYEE'])
  role?: 'ADMIN' | 'HR' | 'EMPLOYEE';

  // Basic employee info
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsDateString()
  date_of_birth?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  // Employment details
  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsDateString()
  date_of_joining?: string;

  @IsOptional()
  @IsString()
  employment_type?: string;

  @IsOptional()
  @IsInt()
  company_id?: number;

  @IsOptional()
  @IsInt()
  manager_id?: number;

  // Legacy fields for backward compatibility
  @IsOptional()
  @IsString()
  full_name?: string;

  @IsOptional()
  @IsString()
  mobile?: string;

  @IsOptional()
  @IsString()
  job_position?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  marital_status?: string;

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

