/**
 * Populate Employee Data for Existing Users
 * Creates employee records with dummy data for users who don't have employee profiles
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Sample data pools
const departments = ['Engineering', 'Human Resources', 'Finance', 'Marketing', 'Sales', 'Operations'];
const designations = ['Software Engineer', 'Senior Developer', 'HR Manager', 'Accountant', 'Marketing Executive', 'Sales Manager', 'Operations Coordinator'];
const employmentTypes = ['Full Time', 'Part Time', 'Contract', 'Intern'];
const genders = ['Male', 'Female', 'Other'];
const locations = ['New York', 'San Francisco', 'London', 'Mumbai', 'Bangalore', 'Sydney'];

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateEmployeeCode(year: number, sequence: number): string {
  const paddedSequence = String(sequence).padStart(3, '0');
  return `ODOO-DH-${year}-${paddedSequence}`;
}

async function main() {
  console.log('🌱 Populating employee data for existing users...\n');

  // Get company
  const company = await prisma.companies.findFirst({
    where: { prefix: 'DH' }
  });

  if (!company) {
    console.log('❌ Company not found. Please run seed-users.ts first.');
    return;
  }

  // Find all users without employee profiles
  const usersWithoutEmployees = await prisma.users.findMany({
    where: {
      employees: null
    },
    include: {
      roles: true
    }
  });

  if (usersWithoutEmployees.length === 0) {
    console.log('✅ All users already have employee profiles!');
    return;
  }

  console.log(`📋 Found ${usersWithoutEmployees.length} users without employee profiles\n`);

  // Get the last employee code sequence number for this year
  const currentYear = new Date().getFullYear();
  const lastEmployee = await prisma.employees.findFirst({
    where: {
      employee_code: {
        startsWith: `ODOO-DH-${currentYear}`
      }
    },
    orderBy: {
      employee_code: 'desc'
    }
  });

  let sequenceNumber = 1;
  if (lastEmployee?.employee_code) {
    const lastSequence = parseInt(lastEmployee.employee_code.split('-').pop() || '0');
    sequenceNumber = lastSequence + 1;
  }

  // Create employee records
  for (const user of usersWithoutEmployees) {
    // Split email to get name parts
    const emailParts = user.email.split('@')[0].split('.');
    const firstName = emailParts[0]?.charAt(0).toUpperCase() + emailParts[0]?.slice(1) || 'Employee';
    const lastName = emailParts[1]?.charAt(0).toUpperCase() + emailParts[1]?.slice(1) || `${sequenceNumber}`;

    // Determine designation based on role
    let designation: string;
    if (user.roles?.name === 'ADMIN') {
      designation = 'Admin Manager';
    } else if (user.roles?.name === 'HR') {
      designation = 'HR Manager';
    } else {
      designation = randomItem(designations);
    }

    // Determine department
    let department: string;
    if (user.roles?.name === 'ADMIN') {
      department = 'Administration';
    } else if (user.roles?.name === 'HR') {
      department = 'Human Resources';
    } else {
      department = randomItem(departments);
    }

    // Generate random dates
    const dateOfBirth = randomDate(new Date('1985-01-01'), new Date('2000-12-31'));
    const dateOfJoining = randomDate(new Date('2020-01-01'), new Date('2025-12-31'));

    const employeeCode = generateEmployeeCode(currentYear, sequenceNumber);

    try {
      const employee = await prisma.employees.create({
        data: {
          user_id: user.id,
          company_id: company.id,
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          email: user.email,
          mobile: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          phone_number: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
          date_of_birth: dateOfBirth,
          gender: randomItem(genders),
          department: department,
          designation: designation,
          date_of_joining: dateOfJoining,
          employment_type: user.roles?.name === 'EMPLOYEE' ? randomItem(employmentTypes) : 'Full Time',
          employee_code: employeeCode,
          location: randomItem(locations),
          nationality: 'American',
          marital_status: Math.random() > 0.5 ? 'Married' : 'Single',
          address: `${Math.floor(Math.random() * 999) + 1} Main Street, ${randomItem(locations)}`,
        }
      });

      console.log(`✅ Created employee profile for ${user.email} (${employeeCode})`);
      sequenceNumber++;
    } catch (error) {
      console.error(`❌ Failed to create employee for ${user.email}:`, error);
    }
  }

  console.log('\n🎉 Employee data population completed!');

  // Show summary
  const totalEmployees = await prisma.employees.count();
  console.log(`\n📊 Total employees in database: ${totalEmployees}`);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
