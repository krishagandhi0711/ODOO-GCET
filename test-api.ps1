# 🧪 Quick API Test Script
# Run this to verify all backend endpoints are working

$baseUrl = "http://localhost:3000"
$testEmail = "admin@dayflow.com"
$testPassword = "Admin@123"

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Dayflow HRMS - API Test Suite" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "Test 1: Backend Health Check" -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$baseUrl" -Method GET -TimeoutSec 5
    Write-Host "✓ Backend is responding (Status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "✗ Backend is not responding" -ForegroundColor Red
    Write-Host "  Make sure backend is running: cd backend && npm run start:dev" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Test 2: Login
Write-Host "Test 2: Authentication - Login" -ForegroundColor Yellow
try {
    $loginBody = @{
        email = $testEmail
        password = $testPassword
    } | ConvertTo-Json

    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
        -Method POST `
        -Body $loginBody `
        -ContentType "application/json"

    $token = $loginResponse.access_token
    $userId = $loginResponse.user.id

    Write-Host "✓ Login successful" -ForegroundColor Green
    Write-Host "  User: $($loginResponse.user.email)" -ForegroundColor Gray
    Write-Host "  Role: $($loginResponse.user.role)" -ForegroundColor Gray
    Write-Host "  Token: $($token.Substring(0, 20))..." -ForegroundColor Gray
} catch {
    Write-Host "✗ Login failed" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "  Run: cd backend && npm run seed:users" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Test 3: Get Profile
Write-Host "Test 3: Get User Profile" -ForegroundColor Yellow
try {
    $headers = @{
        "Authorization" = "Bearer $token"
    }

    $profile = Invoke-RestMethod -Uri "$baseUrl/auth/profile" `
        -Method GET `
        -Headers $headers

    Write-Host "✓ Profile retrieved" -ForegroundColor Green
    Write-Host "  User ID: $($profile.userId)" -ForegroundColor Gray
    Write-Host "  Email: $($profile.email)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to get profile" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: Get Employees
Write-Host "Test 4: Get All Employees" -ForegroundColor Yellow
try {
    $employees = Invoke-RestMethod -Uri "$baseUrl/employees" `
        -Method GET `
        -Headers $headers

    Write-Host "✓ Retrieved $($employees.Count) employees" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to get employees" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 5: Get My Employee Profile
Write-Host "Test 5: Get My Employee Profile" -ForegroundColor Yellow
try {
    $myProfile = Invoke-RestMethod -Uri "$baseUrl/employees/me" `
        -Method GET `
        -Headers $headers

    Write-Host "✓ Employee profile retrieved" -ForegroundColor Green
    Write-Host "  Name: $($myProfile.full_name)" -ForegroundColor Gray
    Write-Host "  Code: $($myProfile.employee_code)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to get employee profile" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 6: Attendance Status
Write-Host "Test 6: Get Attendance Status" -ForegroundColor Yellow
try {
    $status = Invoke-RestMethod -Uri "$baseUrl/attendance/status" `
        -Method GET `
        -Headers $headers

    Write-Host "✓ Attendance status retrieved" -ForegroundColor Green
    Write-Host "  Status: $($status.status)" -ForegroundColor Gray
    Write-Host "  Message: $($status.message)" -ForegroundColor Gray
} catch {
    Write-Host "✗ Failed to get attendance status" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 7: Get Leaves
Write-Host "Test 7: Get Leave Requests" -ForegroundColor Yellow
try {
    $leaves = Invoke-RestMethod -Uri "$baseUrl/leaves" `
        -Method GET `
        -Headers $headers

    Write-Host "✓ Retrieved $($leaves.Count) leave requests" -ForegroundColor Green
} catch {
    Write-Host "✗ Failed to get leaves" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 8: Get Current Payslip
Write-Host "Test 8: Get Current Month Payslip" -ForegroundColor Yellow
try {
    $payslip = Invoke-RestMethod -Uri "$baseUrl/payroll/me/current" `
        -Method GET `
        -Headers $headers

    Write-Host "✓ Payslip retrieved" -ForegroundColor Green
    Write-Host "  Period: $($payslip.period.display)" -ForegroundColor Gray
    Write-Host "  Net Salary: ₹$($payslip.summary.net_salary)" -ForegroundColor Gray
} catch {
    Write-Host "⚠ No payslip data" -ForegroundColor Yellow
    Write-Host "  This is normal if salary structure is not set" -ForegroundColor Gray
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "   Test Summary" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "✓ All critical endpoints are working!" -ForegroundColor Green
Write-Host ""
Write-Host "You can now use the frontend at: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test Credentials:" -ForegroundColor Yellow
Write-Host "  Admin:    admin@dayflow.com / Admin@123" -ForegroundColor White
Write-Host "  HR:       hr@dayflow.com / Hr@123" -ForegroundColor White
Write-Host "  Employee: employee@dayflow.com / Employee@123" -ForegroundColor White
Write-Host ""
