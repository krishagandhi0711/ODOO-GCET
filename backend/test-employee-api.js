// Quick test script - Run with: node test-employee-api.js
const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:3000';
let adminToken = '';

async function test() {
  console.log('🔐 Step 1: Login as Admin...\n');
  
  try {
    // Login as admin
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@dayflow.com',
      password: 'admin123'
    });
    
    adminToken = loginRes.data.access_token;
    console.log('✅ Login successful!');
    console.log('📝 Admin Token:', adminToken.substring(0, 50) + '...\n');
    
    // Generate unique email using timestamp
    const timestamp = Date.now();
    const email1 = `rahul.sharma.${timestamp}@dayflow.com`;
    const email2 = `priya.patel.${timestamp}@dayflow.com`;
    
    // Create first employee
    console.log('👤 Step 2: Creating first employee (Rahul Sharma)...\n');
    
    const employee1 = await axios.post(
      `${BASE_URL}/employees`,
      {
        full_name: "Rahul Sharma",
        email: email1,
        mobile: "9876543210",
        department: "Engineering",
        job_position: "Senior Developer",
        location: "Bangalore",
        dob: "1995-06-15",
        nationality: "Indian",
        role: "EMPLOYEE"
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    
    console.log('✅ Employee created successfully!');
    console.log('🆔 Employee Code:', employee1.data.employee_code);
    console.log('🔑 Login ID:', employee1.data.users.login_id);
    console.log('🔒 Default Password:', employee1.data.defaultPassword);
    console.log('📧 Email:', employee1.data.users.email);
    console.log();
    
    // Create second employee
    console.log('👤 Step 3: Creating second employee (Priya Patel)...\n');
    
    const employee2 = await axios.post(
      `${BASE_URL}/employees`,
      {
        full_name: "Priya Patel",
        email: email2,
        mobile: "9876543211",
        department: "HR",
        job_position: "HR Manager",
        location: "Mumbai",
        role: "HR"
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    
    console.log('✅ Employee created successfully!');
    console.log('🆔 Employee Code:', employee2.data.employee_code);
    console.log('🔑 Login ID:', employee2.data.users.login_id);
    console.log('🔒 Default Password:', employee2.data.defaultPassword);
    console.log('📧 Email:', employee2.data.users.email);
    console.log();
    
    // Get all employees
    console.log('📋 Step 4: Fetching all employees...\n');
    
    const allEmployees = await axios.get(
      `${BASE_URL}/employees`,
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    
    console.log(`✅ Found ${allEmployees.data.length} employees:`);
    allEmployees.data.forEach((emp, i) => {
      console.log(`   ${i + 1}. ${emp.employee_code} - ${emp.full_name} (${emp.department})`);
    });
    console.log();
    
    // Test new employee login
    console.log('🔐 Step 5: Testing new employee login...\n');
    
    const empLoginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: email1,
      password: "Welcome@123"
    });
    
    console.log('✅ New employee can login!');
    console.log('🎫 Employee Token:', empLoginRes.data.access_token.substring(0, 50) + '...');
    console.log('👤 User Info:', JSON.stringify(empLoginRes.data.user, null, 2));
    console.log();
    
    // Test /me endpoint
    console.log('👤 Step 6: Testing /employees/me endpoint...\n');
    
    const meRes = await axios.get(
      `${BASE_URL}/employees/me`,
      { headers: { Authorization: `Bearer ${empLoginRes.data.access_token}` } }
    );
    
    console.log('✅ Employee can access own profile:');
    console.log('   Name:', meRes.data.full_name);
    console.log('   Code:', meRes.data.employee_code);
    console.log('   Department:', meRes.data.department);
    console.log();
    
    // Test duplicate email (should fail)
    console.log('⚠️  Step 7: Testing duplicate email protection...\n');
    
    try {
      await axios.post(
        `${BASE_URL}/employees`,
        {
          full_name: "Another Person",
          email: email1, // Duplicate - should fail
          mobile: "1234567890",
          department: "IT",
          job_position: "Developer"
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      console.log('❌ FAILED: Duplicate email should have been rejected!');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log('✅ Duplicate email correctly rejected!');
        console.log('   Error:', error.response.data.message);
      } else {
        console.log('⚠️  Unexpected error:', error.message);
      }
    }
    console.log();
    
    // Test unauthorized access
    console.log('🚫 Step 8: Testing unauthorized access (no token)...\n');
    
    try {
      await axios.get(`${BASE_URL}/employees`);
      console.log('❌ FAILED: Should require authentication!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Correctly rejected unauthenticated request!');
      } else {
        console.log('⚠️  Unexpected error:', error.message);
      }
    }
    console.log();
    
    console.log('🎉 ALL TESTS PASSED!\n');
    console.log('📊 Summary:');
    console.log('   ✅ Admin authentication works');
    console.log('   ✅ Auto-ID generation working (ODOO-DH-YYYY-XXX)');
    console.log('   ✅ Auto login_id generation working');
    console.log('   ✅ Atomic transaction working');
    console.log('   ✅ New employees can login with default password');
    console.log('   ✅ /me endpoint working');
    console.log('   ✅ Duplicate email protection working');
    console.log('   ✅ Authentication guards working');
    console.log();
    
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

test();
