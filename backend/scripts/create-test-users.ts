import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // First, ensure we have a role
    const adminRole = await prisma.roles.upsert({
      where: { name: 'ADMIN' },
      update: {},
      create: { name: 'ADMIN' },
    });

    console.log('✓ Admin role ensured');

    // Create a test company (if needed)
    const company = await prisma.companies.upsert({
      where: { prefix: 'TEST' },
      update: {},
      create: {
        name: 'Test Company',
        prefix: 'TEST',
      },
    });

    console.log('✓ Test company created');

    // Create admin user
    const adminUser = await prisma.users.upsert({
      where: { email: 'admin@dayflow.com' },
      update: {
        password: hashedPassword,
      },
      create: {
        login_id: 'admin001',
        email: 'admin@dayflow.com',
        password: hashedPassword,
        role_id: adminRole.id,
        company_id: company.id,
        is_first_login: false,
      },
    });

    console.log('\n✓ Test admin user created successfully!\n');
    console.log('Login credentials:');
    console.log('  Email: admin@dayflow.com');
    console.log('  Password: admin123');
    console.log('\nTest with:');
    console.log('  POST http://localhost:3000/auth/login');
    console.log('  Body: { "email": "admin@dayflow.com", "password": "admin123" }');

    // Create HR user
    const hrRole = await prisma.roles.upsert({
      where: { name: 'HR' },
      update: {},
      create: { name: 'HR' },
    });

    const hrPassword = await bcrypt.hash('hr123', 10);
    await prisma.users.upsert({
      where: { email: 'hr@dayflow.com' },
      update: {
        password: hrPassword,
      },
      create: {
        login_id: 'hr001',
        email: 'hr@dayflow.com',
        password: hrPassword,
        role_id: hrRole.id,
        company_id: company.id,
        is_first_login: false,
      },
    });

    console.log('\n✓ Test HR user created!');
    console.log('  Email: hr@dayflow.com');
    console.log('  Password: hr123');

    // Create Employee user
    const employeeRole = await prisma.roles.upsert({
      where: { name: 'EMPLOYEE' },
      update: {},
      create: { name: 'EMPLOYEE' },
    });

    const employeePassword = await bcrypt.hash('employee123', 10);
    await prisma.users.upsert({
      where: { email: 'employee@dayflow.com' },
      update: {
        password: employeePassword,
      },
      create: {
        login_id: 'emp001',
        email: 'employee@dayflow.com',
        password: employeePassword,
        role_id: employeeRole.id,
        company_id: company.id,
        is_first_login: false,
      },
    });

    console.log('\n✓ Test Employee user created!');
    console.log('  Email: employee@dayflow.com');
    console.log('  Password: employee123\n');
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
