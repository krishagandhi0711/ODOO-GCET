# Test Authentication Phase 2 - Dayflow HRMS
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   DAYFLOW HRMS - Authentication Testing (Phase 2)" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Wait for server to be ready
Write-Host "Waiting for server to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# Test 1: Admin Login
Write-Host "`n========== TEST 1: Admin Login ==========" -ForegroundColor Green
$adminBody = @{
    email = "admin@dayflow.com"
    password = "admin123"
} | ConvertTo-Json

try {
    $adminResponse = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -Body $adminBody -ContentType "application/json"
    Write-Host "✓ Login successful!" -ForegroundColor Green
    Write-Host "User: $($adminResponse.user.email)" -ForegroundColor White
    Write-Host "Role: $($adminResponse.user.role)" -ForegroundColor White
    Write-Host "Token (first 30 chars): $($adminResponse.access_token.Substring(0,30))..." -ForegroundColor White
    $adminToken = $adminResponse.access_token
} catch {
    Write-Host "✗ Login failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Get Profile with Token
Write-Host "`n========== TEST 2: Get Profile (Protected Route) ==========" -ForegroundColor Green
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $profileResponse = Invoke-RestMethod -Uri "http://localhost:3000/auth/profile" -Method GET -Headers $headers
    Write-Host "✓ Profile retrieved successfully!" -ForegroundColor Green
    Write-Host "Email: $($profileResponse.email)" -ForegroundColor White
    Write-Host "Role: $($profileResponse.role)" -ForegroundColor White
    Write-Host "ID: $($profileResponse.id)" -ForegroundColor White
} catch {
    Write-Host "✗ Profile retrieval failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Admin-only endpoint with Admin token
Write-Host "`n========== TEST 3: Admin-Only Endpoint (Admin Token) ==========" -ForegroundColor Green
try {
    $headers = @{
        Authorization = "Bearer $adminToken"
    }
    $adminTestResponse = Invoke-RestMethod -Uri "http://localhost:3000/auth/admin-test" -Method GET -Headers $headers
    Write-Host "✓ Admin endpoint accessed successfully!" -ForegroundColor Green
    Write-Host "Message: $($adminTestResponse.message)" -ForegroundColor White
    Write-Host "User: $($adminTestResponse.user.email)" -ForegroundColor White
} catch {
    Write-Host "✗ Admin endpoint access failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Login as Employee
Write-Host "`n========== TEST 4: Employee Login ==========" -ForegroundColor Green
$employeeBody = @{
    email = "employee@dayflow.com"
    password = "employee123"
} | ConvertTo-Json

try {
    $employeeResponse = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -Body $employeeBody -ContentType "application/json"
    Write-Host "✓ Employee login successful!" -ForegroundColor Green
    Write-Host "User: $($employeeResponse.user.email)" -ForegroundColor White
    Write-Host "Role: $($employeeResponse.user.role)" -ForegroundColor White
    $employeeToken = $employeeResponse.access_token
} catch {
    Write-Host "✗ Employee login failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Admin-only endpoint with Employee token (should fail)
Write-Host "`n========== TEST 5: Admin-Only Endpoint (Employee Token - Should Fail) ==========" -ForegroundColor Green
try {
    $headers = @{
        Authorization = "Bearer $employeeToken"
    }
    $response = Invoke-RestMethod -Uri "http://localhost:3000/auth/admin-test" -Method GET -Headers $headers
    Write-Host "✗ UNEXPECTED: Employee was able to access admin endpoint!" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 403) {
        Write-Host "✓ Correct! Employee got 403 Forbidden as expected" -ForegroundColor Green
        Write-Host "Status: $($_.Exception.Response.StatusCode)" -ForegroundColor White
    } else {
        Write-Host "✗ Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "   Testing Complete!" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
