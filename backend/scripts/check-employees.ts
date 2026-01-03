/**
 * Check Employee Records
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Checking employee records...\n');

  const employees = await prisma.employees.findMany({
    where: {
      user_id: { not: null }
    },
    include: {
      users: {
        select: {
          id: true,
          email: true,
          roles: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });

  console.log(`Found ${employees.length} employees with user accounts:\n`);

  employees.forEach(emp => {
    console.log(`User ID: ${emp.user_id} | Email: ${emp.users?.email} | Role: ${emp.users?.roles?.name}`);
    console.log(`  Employee: ${emp.first_name} ${emp.last_name} (${emp.employee_code})`);
    console.log(`  Department: ${emp.department || 'N/A'} | Designation: ${emp.designation || 'N/A'}`);
    console.log('');
  });

  // Check for users without employees
  const usersWithoutEmployees = await prisma.users.findMany({
    where: {
      employees: null
    },
    include: {
      roles: true
    }
  });

  if (usersWithoutEmployees.length > 0) {
    console.log(`\n⚠️  Found ${usersWithoutEmployees.length} users WITHOUT employee profiles:`);
    usersWithoutEmployees.forEach(user => {
      console.log(`  - ${user.email} (${user.roles?.name})`);
    });
  } else {
    console.log('✅ All users have employee profiles!');
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
