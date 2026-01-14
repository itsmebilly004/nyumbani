# Nyumbani Backend API Test Script
# Run this to test if your backend is working correctly

$API_URL = "http://localhost:3000"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Nyumbani Backend API Test Suite" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Health Check
Write-Host "Test 1: Health Check" -ForegroundColor Yellow
Write-Host "GET $API_URL/" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$API_URL/" -Method Get
    Write-Host "✓ PASSED: Server is running" -ForegroundColor Green
    Write-Host "Status: $($response.status)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ FAILED: Cannot connect to server" -ForegroundColor Red
    Write-Host "Make sure server is running with 'npm run dev'" -ForegroundColor Red
    Write-Host ""
    exit 1
}

# Test 2: Submit Valid Application
Write-Host "Test 2: Submit Valid Application" -ForegroundColor Yellow
Write-Host "POST $API_URL/applications" -ForegroundColor Gray
$body = @{
    full_name = "Jane Wanjiru Doe"
    email = "jane.doe@example.com"
    country = "United States"
    relationship_to_kenya = "My parents emigrated from Nairobi in 1995. I grew up hearing stories about home but have never visited."
    interest_area = "I'm interested in reconnecting with my roots and learning Swahili."
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$API_URL/applications" -Method Post -Body $body -ContentType "application/json"
    Write-Host "✓ PASSED: Application submitted successfully" -ForegroundColor Green
    Write-Host "Application ID: $($response.data.id)" -ForegroundColor Green
    Write-Host "Created at: $($response.data.created_at)" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "✗ FAILED: Could not submit application" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
}

# Test 3: Submit Invalid Application (Missing Fields)
Write-Host "Test 3: Validation Test (Missing Email)" -ForegroundColor Yellow
Write-Host "POST $API_URL/applications (invalid data)" -ForegroundColor Gray
$invalidBody = @{
    full_name = "Test User"
    country = "Kenya"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$API_URL/applications" -Method Post -Body $invalidBody -ContentType "application/json"
    Write-Host "✗ FAILED: Validation should have rejected this" -ForegroundColor Red
    Write-Host ""
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 400) {
        Write-Host "✓ PASSED: Validation correctly rejected invalid data" -ForegroundColor Green
        Write-Host "Status Code: 400 (Bad Request)" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "✗ FAILED: Unexpected error" -ForegroundColor Red
        Write-Host ""
    }
}

# Test 4: Submit Invalid Email Format
Write-Host "Test 4: Email Validation Test" -ForegroundColor Yellow
Write-Host "POST $API_URL/applications (invalid email)" -ForegroundColor Gray
$invalidEmailBody = @{
    full_name = "Test User"
    email = "not-an-email"
    country = "Kenya"
    relationship_to_kenya = "Test relationship"
    interest_area = "Test interest"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$API_URL/applications" -Method Post -Body $invalidEmailBody -ContentType "application/json"
    Write-Host "✗ FAILED: Email validation should have rejected this" -ForegroundColor Red
    Write-Host ""
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 400) {
        Write-Host "✓ PASSED: Email validation working correctly" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "✗ FAILED: Unexpected error" -ForegroundColor Red
        Write-Host ""
    }
}

# Test 5: 404 Test
Write-Host "Test 5: 404 Handler Test" -ForegroundColor Yellow
Write-Host "GET $API_URL/nonexistent" -ForegroundColor Gray
try {
    $response = Invoke-RestMethod -Uri "$API_URL/nonexistent" -Method Get
    Write-Host "✗ FAILED: Should return 404" -ForegroundColor Red
    Write-Host ""
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    if ($statusCode -eq 404) {
        Write-Host "✓ PASSED: 404 handler working correctly" -ForegroundColor Green
        Write-Host ""
    } else {
        Write-Host "✗ FAILED: Unexpected status code" -ForegroundColor Red
        Write-Host ""
    }
}

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Test Suite Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Run 'npm run prisma:studio' to view submitted applications" -ForegroundColor White
Write-Host "2. Share API URL with frontend team: $API_URL" -ForegroundColor White
Write-Host "3. Deploy to Railway/Render when ready" -ForegroundColor White
Write-Host ""
