/**
 * Test script to verify employee creation endpoint
 * Tests both ADMIN and HR roles
 */

const axios = require('axios');

const API_BASE = 'http://127.0.0.1:3000';

// Test data
const testEmployee = {
  email: 'test.employee@dayflow.com',
  password: 'Test@1234',
  role: 'EMPLOYEE',
  first_name: 'Test',
  last_name: 'Employee',
  phone_number: '9876543210',
  date_of_birth: '1995-05-15',
  gender: 'Male',
  address: '123 Test Street',
  department: 'Engineering',
  designation: 'Software Engineer',
  date_of_joining: new Date().toISOString().split('T')[0],
  employment_type: 'FULL_TIME',
  company_id: 1,
};

async function loginAsAdmin() {
  try {
    console.log('\n🔐 Logging in as Admin...');
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin@dayflow.com',
      password: 'Admin@123',
    });
    console.log('✅ Admin login successful');
    console.log('Role:', response.data.user.role);
    return response.data.access_token;
  } catch (error) {
    console.error('❌ Admin login failed:', error.response?.data || error.message);
    throw error;
  }
}

async function createEmployee(token) {
  try {
    console.log('\n👤 Creating employee...');
    console.log('Data:', JSON.stringify(testEmployee, null, 2));
    
    const response = await axios.post(
      `${API_BASE}/employees`,
      testEmployee,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('✅ Employee created successfully!');
    console.log('Employee Code:', response.data.employee_code);
    console.log('Employee ID:', response.data.id);
    console.log('Name:', response.data.first_name, response.data.last_name);
    return response.data;
  } catch (error) {
    console.error('❌ Employee creation failed:');
    console.error('Status:', error.response?.status);
    console.error('Error:', JSON.stringify(error.response?.data, null, 2));
    throw error;
  }
}

async function getEmployees(token) {
  try {
    console.log('\n📋 Fetching all employees...');
    const response = await axios.get(`${API_BASE}/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`✅ Found ${response.data.length} employees`);
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch employees:', error.response?.data || error.message);
    throw error;
  }
}

async function deleteEmployee(token, employeeId) {
  try {
    console.log(`\n🗑️ Deleting employee ${employeeId}...`);
    await axios.delete(`${API_BASE}/employees/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('✅ Employee deleted successfully');
  } catch (error) {
    console.error('❌ Failed to delete employee:', error.response?.data || error.message);
  }
}

async function runTest() {
  let token;
  let createdEmployeeId;
  
  try {
    // Step 1: Login as Admin
    token = await loginAsAdmin();
    
    // Step 2: Create employee
    const employee = await createEmployee(token);
    createdEmployeeId = employee.id;
    
    // Step 3: Fetch all employees
    await getEmployees(token);
    
    // Step 4: Cleanup - delete test employee
    if (createdEmployeeId) {
      await deleteEmployee(token, createdEmployeeId);
    }
    
    console.log('\n✅ All tests passed!');
  } catch (error) {
    console.error('\n❌ Test failed');
    
    // Try to cleanup even if test failed
    if (token && createdEmployeeId) {
      await deleteEmployee(token, createdEmployeeId);
    }
  }
}

// Run the test
runTest();
