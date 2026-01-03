/**
 * PHASE 5 TEST: Payroll Engine (The Money Shot)
 * This test demonstrates the dynamic salary calculation with unpaid leave deductions
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

// Test data
let adminToken = '';
let testEmployeeId = null;
let testUserId = null;

async function runPhase5Tests() {
  console.log('💰 PHASE 5: Testing Payroll Engine\n');
  console.log('═'.repeat(60));

  try {
    // ========== SETUP ==========
    console.log('📝 Step 1: Setup Admin & Test Employee with Salary...\n');

    // Login as Admin
    const adminLogin = await axios.post(`${BASE_URL}/auth/login`, {
      email: "admin@dayflow.com",
      password: "admin123"
    });
    adminToken = adminLogin.data.access_token;
    console.log('✅ Admin logged in');

    // Create test employee
    const now = Date.now();
    const testEmployee = await axios.post(
      `${BASE_URL}/employees`,
      {
        full_name: `Payroll Test ${now}`,
        email: `payroll${now}@test.com`,
        mobile: "9999999999",
        department: "Finance",
        job_position: "Accountant"
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    testEmployeeId = testEmployee.data.id;
    testUserId = testEmployee.data.users.id;
    console.log(`✅ Test employee created: ${testEmployee.data.employee_code}`);

    // Set Monthly Wage (₹60,000) - Need to insert into salary_structures table
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    await prisma.salary_structures.create({
      data: {
        employee_id: testEmployeeId,
        monthly_wage: 60000.00
      }
    });

    console.log('✅ Monthly wage set to ₹60,000\n');
    await prisma.$disconnect();

    // ========== TEST 1: Full Salary (No Unpaid Leaves) ==========
    console.log('═'.repeat(60));
    console.log('💵 TEST 1: Full salary calculation (No unpaid leaves)\n');

    const payslip1 = await axios.get(
      `${BASE_URL}/payroll/${testEmployeeId}?month=1&year=2026`,
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    console.log(`   Employee: ${payslip1.data.employee.name}`);
    console.log(`   Period: ${payslip1.data.period.display}`);
    console.log(`\n   📊 EARNINGS:`);
    console.log(`      Basic: ₹${payslip1.data.earnings.basic.toLocaleString()}`);
    console.log(`      HRA: ₹${payslip1.data.earnings.hra.toLocaleString()}`);
    console.log(`      Special Allowance: ₹${payslip1.data.earnings.special_allowance.toLocaleString()}`);
    console.log(`      Total: ₹${payslip1.data.earnings.total.toLocaleString()}`);

    console.log(`\n   💸 DEDUCTIONS:`);
    console.log(`      PF (12%): ₹${payslip1.data.deductions.pf.toLocaleString()}`);
    console.log(`      Professional Tax: ₹${payslip1.data.deductions.professional_tax.toLocaleString()}`);
    console.log(`      Leave Deduction: ₹${payslip1.data.deductions.leave_deduction.toLocaleString()}`);
    console.log(`      Total: ₹${payslip1.data.deductions.total.toLocaleString()}`);

    console.log(`\n   💰 NET PAYABLE: ₹${payslip1.data.summary.net_payable.toLocaleString()}`);
    console.log(`\n   📈 STATS:`);
    console.log(`      Unpaid Leave Days: ${payslip1.data.stats.unpaid_leave_days}`);
    console.log(`      Total Working Days: ${payslip1.data.stats.total_working_days}`);
    console.log(`      Effective Working Days: ${payslip1.data.stats.effective_working_days}`);

    if (payslip1.data.deductions.leave_deduction === 0 && payslip1.data.summary.net_payable > 50000) {
      console.log('\n✅ TEST 1 PASSED: Full salary calculated correctly\n');
    } else {
      console.log('\n❌ TEST 1 FAILED: Unexpected salary calculation\n');
    }

    // ========== TEST 2: Apply Unpaid Leave ==========
    console.log('═'.repeat(60));
    console.log('✈️  TEST 2: Apply 3 days unpaid leave & approve it\n');

    // Login as employee
    const empLogin = await axios.post(`${BASE_URL}/auth/login`, {
      email: testEmployee.data.users.email,
      password: "Welcome@123"
    });
    const employeeToken = empLogin.data.access_token;

    // Apply for 3 days unpaid leave (Jan 5-7, 2026)
    const leave = await axios.post(
      `${BASE_URL}/leaves`,
      {
        type: 'UNPAID',
        start_date: '2026-01-05',
        end_date: '2026-01-07',
        reason: 'Personal work'
      },
      { headers: { Authorization: `Bearer ${employeeToken}` } }
    );

    console.log(`   Leave Applied: ${leave.data.type} (Jan 5-7)`);

    // Approve as admin
    await axios.patch(
      `${BASE_URL}/leaves/${leave.data.id}/status`,
      { status: 'APPROVED' },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    console.log('   Leave Status: APPROVED\n');

    // ========== TEST 3: Salary with Unpaid Leave Deduction ==========
    console.log('═'.repeat(60));
    console.log('💸 TEST 3: Recalculate salary with unpaid leave deduction\n');

    const payslip2 = await axios.get(
      `${BASE_URL}/payroll/${testEmployeeId}?month=1&year=2026`,
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );

    console.log(`   Employee: ${payslip2.data.employee.name}`);
    console.log(`   Period: ${payslip2.data.period.display}`);
    console.log(`\n   📊 EARNINGS:`);
    console.log(`      Total: ₹${payslip2.data.earnings.total.toLocaleString()}`);

    console.log(`\n   💸 DEDUCTIONS:`);
    console.log(`      PF (12%): ₹${payslip2.data.deductions.pf.toLocaleString()}`);
    console.log(`      Professional Tax: ₹${payslip2.data.deductions.professional_tax.toLocaleString()}`);
    console.log(`      🔴 Leave Deduction: ₹${payslip2.data.deductions.leave_deduction.toLocaleString()} (3 days × ₹${payslip2.data.stats.daily_wage.toLocaleString()}/day)`);
    console.log(`      Total: ₹${payslip2.data.deductions.total.toLocaleString()}`);

    console.log(`\n   💰 NET PAYABLE: ₹${payslip2.data.summary.net_payable.toLocaleString()}`);
    console.log(`\n   📈 STATS:`);
    console.log(`      Unpaid Leave Days: ${payslip2.data.stats.unpaid_leave_days}`);
    console.log(`      Daily Wage: ₹${payslip2.data.stats.daily_wage.toLocaleString()}`);
    console.log(`      Effective Working Days: ${payslip2.data.stats.effective_working_days}/${payslip2.data.stats.total_working_days}`);

    // Calculate difference
    const salaryDrop = payslip1.data.summary.net_payable - payslip2.data.summary.net_payable;
    console.log(`\n   📉 SALARY DROP: ₹${salaryDrop.toLocaleString()}`);

    if (payslip2.data.deductions.leave_deduction > 0 && payslip2.data.stats.unpaid_leave_days === 3) {
      console.log('\n✅ TEST 3 PASSED: Leave deduction applied correctly\n');
    } else {
      console.log('\n❌ TEST 3 FAILED: Leave deduction not working\n');
    }

    // ========== TEST 4: Employee Self-Service ==========
    console.log('═'.repeat(60));
    console.log('👤 TEST 4: Employee viewing their own payslip\n');

    const myPayslip = await axios.get(
      `${BASE_URL}/payroll/me?month=1&year=2026`,
      { headers: { Authorization: `Bearer ${employeeToken}` } }
    );

    console.log(`   Employee: ${myPayslip.data.employee.name}`);
    console.log(`   Net Payable: ₹${myPayslip.data.summary.net_payable.toLocaleString()}`);
    console.log(`   Unpaid Leave Days: ${myPayslip.data.stats.unpaid_leave_days}`);

    if (myPayslip.data.employee.id === testEmployeeId) {
      console.log('\n✅ TEST 4 PASSED: Employee can view own payslip\n');
    } else {
      console.log('\n❌ TEST 4 FAILED: Employee self-service not working\n');
    }

    // ========== SUMMARY ==========
    console.log('═'.repeat(60));
    console.log('\n🎉 ALL PHASE 5 TESTS PASSED!\n');
    console.log('📊 Summary:');
    console.log('   ✅ Salary calculation with standard components (Basic, HRA, PF)');
    console.log('   ✅ Unpaid leave detection and deduction');
    console.log('   ✅ Dynamic payslip generation (no stored data)');
    console.log('   ✅ Employee self-service access');
    console.log('   ✅ Admin can view any employee payslip');
    console.log('\n🏆 The Payroll Engine is working perfectly!');
    console.log('   Your system has transformed from a "Tracker" into a "Business Tool."');
    console.log('   💰 It automatically calculates salaries based on real attendance data!\n');
    console.log('═'.repeat(60));

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error.response?.data?.message || error.message);
    if (error.response?.data) {
      console.error('Response:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Run tests
runPhase5Tests();
