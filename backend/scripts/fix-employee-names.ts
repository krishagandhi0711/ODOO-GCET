/**
 * Fix Employee Names
 * Updates all employees with null first_name/last_name
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔧 Fixing employee names...\n');

  const employeesWithNullNames = await prisma.employees.findMany({
    where: {
      OR: [
        { first_name: null },
        { last_name: null }
      ]
    },
    include: {
      users: {
        select: {
          email: true
        }
      }
    }
  });

  console.log(`Found ${employeesWithNullNames.length} employees with null names\n`);

  for (const emp of employeesWithNullNames) {
    // Extract name from email or use full_name or generate from employee code
    let firstName = 'Employee';
    let lastName = emp.employee_code?.split('-').pop() || `${emp.id}`;

    if (emp.full_name && emp.full_name !== 'null null') {
      const parts = emp.full_name.split(' ');
      firstName = parts[0] || 'Employee';
      lastName = parts.slice(1).join(' ') || emp.id.toString();
    } else if (emp.users?.email) {
      const emailParts = emp.users.email.split('@')[0].split('.');
      firstName = emailParts[0]?.charAt(0).toUpperCase() + emailParts[0]?.slice(1) || 'Employee';
      lastName = emailParts[1]?.charAt(0).toUpperCase() + emailParts[1]?.slice(1) || emp.id.toString();
    }

    await prisma.employees.update({
      where: { id: emp.id },
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`,
        email: emp.users?.email || emp.email
      }
    });

    console.log(`✅ Updated: ${emp.employee_code} -> ${firstName} ${lastName} (${emp.users?.email})`);
  }

  console.log('\n🎉 All employee names fixed!');

  // Show updated summary
  const allEmployees = await prisma.employees.findMany({
    select: {
      employee_code: true,
      first_name: true,
      last_name: true,
      email: true
    },
    orderBy: {
      employee_code: 'asc'
    }
  });

  console.log('\n📊 Updated Employee List:');
  allEmployees.forEach(emp => {
    console.log(`  ${emp.employee_code}: ${emp.first_name} ${emp.last_name} (${emp.email})`);
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
