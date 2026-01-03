# Simple Authentication Test Script
Write-Host "Testing Authentication System..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Admin Login
Write-Host "TEST 1: Admin Login" -ForegroundColor Green
$body1 = '{"email":"admin@dayflow.com","password":"admin123"}'
try {
    $resp1 = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -Body $body1 -ContentType "application/json"
    Write-Host "  SUCCESS - Token received" -ForegroundColor Green
    Write-Host "  User: $($resp1.user.email), Role: $($resp1.user.role)" -ForegroundColor White
    $adminToken = $resp1.access_token
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Protected Route
Write-Host ""
Write-Host "TEST 2: Get Profile (Protected Route)" -ForegroundColor Green
try {
    $headers = @{ Authorization = "Bearer $adminToken" }
    $resp2 = Invoke-RestMethod -Uri "http://localhost:3000/auth/profile" -Method GET -Headers $headers
    Write-Host "  SUCCESS - Profile retrieved" -ForegroundColor Green
    Write-Host "  Email: $($resp2.email), Role: $($resp2.role)" -ForegroundColor White
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Admin-Only Route with Admin Token
Write-Host ""
Write-Host "TEST 3: Admin-Only Route (Admin Token)" -ForegroundColor Green
try {
    $headers = @{ Authorization = "Bearer $adminToken" }
    $resp3 = Invoke-RestMethod -Uri "http://localhost:3000/auth/admin-test" -Method GET -Headers $headers
    Write-Host "  SUCCESS - Admin endpoint accessed" -ForegroundColor Green
    Write-Host "  Message: $($resp3.message)" -ForegroundColor White
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Employee Login
Write-Host ""
Write-Host "TEST 4: Employee Login" -ForegroundColor Green
$body2 = '{"email":"employee@dayflow.com","password":"employee123"}'
try {
    $resp4 = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -Body $body2 -ContentType "application/json"
    Write-Host "  SUCCESS - Employee logged in" -ForegroundColor Green
    Write-Host "  User: $($resp4.user.email), Role: $($resp4.user.role)" -ForegroundColor White
    $empToken = $resp4.access_token
} catch {
    Write-Host "  FAILED: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Admin-Only Route with Employee Token (Should Fail)
Write-Host ""
Write-Host "TEST 5: Admin-Only Route (Employee Token - Should Get 403)" -ForegroundColor Green
try {
    $headers = @{ Authorization = "Bearer $empToken" }
    $resp5 = Invoke-RestMethod -Uri "http://localhost:3000/auth/admin-test" -Method GET -Headers $headers
    Write-Host "  UNEXPECTED: Employee accessed admin endpoint!" -ForegroundColor Red
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 403) {
        Write-Host "  SUCCESS - Got 403 Forbidden as expected" -ForegroundColor Green
    } else {
        Write-Host "  FAILED: Got status $statusCode instead of 403" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "All tests completed!" -ForegroundColor Cyan
