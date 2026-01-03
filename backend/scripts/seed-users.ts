/**
 * Seed Script: Create Test Users
 * Creates ADMIN and HR users for testing
 */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with test users...\n');

  // Create company if not exists
  let company = await prisma.companies.findFirst({
    where: { prefix: 'DH' }
  });

  if (!company) {
    console.log('📦 Creating company...');
    company = await prisma.companies.create({
      data: {
        name: 'Dayflow HRMS',
        prefix: 'DH',
      },
    });
    console.log('✅ Company created:', company.name);
  } else {
    console.log('✅ Company exists:', company.name);
  }

  // Hash passwords
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const hrPassword = await bcrypt.hash('HR@123', 10);

  // Find roles
  const adminRole = await prisma.roles.findUnique({ where: { name: 'ADMIN' } });
  const hrRole = await prisma.roles.findUnique({ where: { name: 'HR' } });

  if (!adminRole || !hrRole) {
    console.log('❌ Roles not found. Please run Prisma migrations first.');
    return;
  }

  // Create Admin User
  console.log('\n👤 Creating Admin user...');
  const existingAdmin = await prisma.users.findUnique({
    where: { email: 'admin@dayflow.com' },
  });

  if (existingAdmin) {
    console.log('⚠️ Admin user already exists');
  } else {
    const adminUser = await prisma.users.create({
      data: {
        login_id: 'admin',
        email: 'admin@dayflow.com',
        password: adminPassword,
        role_id: adminRole.id,
        company_id: company.id,
        is_first_login: false,
      },
    });

    await prisma.employees.create({
      data: {
        user_id: adminUser.id,
        company_id: company.id,
        first_name: 'System',
        last_name: 'Administrator',
        full_name: 'System Administrator',
        email: 'admin@dayflow.com',
        mobile: '9999999999',
        phone_number: '9999999999',
        department: 'Administration',
        designation: 'System Admin',
        job_position: 'System Admin',
        employee_code: 'ODOO-DH-2026-ADMIN',
        employment_type: 'FULL_TIME',
        date_of_joining: new Date(),
        gender: 'Other',
      },
    });

    console.log('✅ Admin user created: admin@dayflow.com / Admin@123');
  }

  // Create HR User
  console.log('\n👤 Creating HR user...');
  const existingHR = await prisma.users.findUnique({
    where: { email: 'hr@dayflow.com' },
  });

  if (existingHR) {
    console.log('⚠️ HR user already exists');
  } else {
    const hrUser = await prisma.users.create({
      data: {
        login_id: 'hr',
        email: 'hr@dayflow.com',
        password: hrPassword,
        role_id: hrRole.id,
        company_id: company.id,
        is_first_login: false,
      },
    });

    await prisma.employees.create({
      data: {
        user_id: hrUser.id,
        company_id: company.id,
        first_name: 'HR',
        last_name: 'Manager',
        full_name: 'HR Manager',
        email: 'hr@dayflow.com',
        mobile: '9999999998',
        phone_number: '9999999998',
        department: 'Human Resources',
        designation: 'HR Manager',
        job_position: 'HR Manager',
        employee_code: 'ODOO-DH-2026-HR',
        employment_type: 'FULL_TIME',
        date_of_joining: new Date(),
        gender: 'Other',
      },
    });

    console.log('✅ HR user created: hr@dayflow.com / HR@123');
  }

  console.log('\n✅ Database seeding completed!\n');
  console.log('Test Credentials:');
  console.log('─────────────────────────────────');
  console.log('Admin: admin@dayflow.com / Admin@123');
  console.log('HR: hr@dayflow.com / HR@123');
  console.log('─────────────────────────────────\n');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
