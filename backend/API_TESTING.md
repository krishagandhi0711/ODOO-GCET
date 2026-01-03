# DayFlow HRMS - Auth API Testing Guide

This file contains example API requests for testing the authentication system.
You can use these with Postman, Thunder Client, or any REST client.

## Base URL
```
http://localhost:3000
```

---

## 1. Login (Get JWT Token)

### Request
```
POST /auth/login
Content-Type: application/json

{
  "email": "admin@dayflow.com",
  "password": "admin123"
}
```

### Response (Success - 200)
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@dayflow.com",
    "loginId": "admin001",
    "role": "ADMIN",
    "companyId": 1,
    "isFirstLogin": false
  }
}
```

### Response (Failure - 401)
```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "error": "Unauthorized"
}
```

---

## 2. Get User Profile (Protected Route)

### Request
```
GET /auth/profile
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

### Response (Success - 200)
```json
{
  "userId": 1,
  "email": "admin@dayflow.com",
  "role": "ADMIN",
  "companyId": 1
}
```

### Response (No Token - 401)
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

---

## 3. Admin Only Endpoint (Role Protected)

### Request
```
GET /auth/admin-test
Authorization: Bearer ADMIN_ACCESS_TOKEN_HERE
```

### Response (Success - Admin User - 200)
```json
{
  "message": "This endpoint is only accessible by ADMIN users"
}
```

### Response (Forbidden - Non-Admin User - 403)
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

---

## Test Users Created

### Admin User
- **Email:** admin@dayflow.com
- **Password:** admin123
- **Role:** ADMIN
- **Can Access:** All endpoints

### HR User
- **Email:** hr@dayflow.com
- **Password:** hr123
- **Role:** HR
- **Can Access:** Profile, but NOT admin-test

### Employee User
- **Email:** employee@dayflow.com
- **Password:** employee123
- **Role:** EMPLOYEE
- **Can Access:** Profile, but NOT admin-test

---

## How to Use in Postman

1. **Login:**
   - Method: POST
   - URL: `http://localhost:3000/auth/login`
   - Body (raw JSON):
     ```json
     {
       "email": "admin@dayflow.com",
       "password": "admin123"
     }
     ```
   - Click Send
   - Copy the `access_token` from the response

2. **Test Protected Endpoint:**
   - Method: GET
   - URL: `http://localhost:3000/auth/profile`
   - Go to Authorization tab
   - Type: Bearer Token
   - Token: Paste the access_token
   - Click Send

3. **Test Role-Based Access:**
   - Method: GET
   - URL: `http://localhost:3000/auth/admin-test`
   - Authorization: Bearer Token (use admin token = works, use employee token = forbidden)
   - Click Send

---

## Validation Examples

### Invalid Email Format
```
POST /auth/login
Body: { "email": "not-an-email", "password": "admin123" }

Response (400):
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

### Missing Password
```
POST /auth/login
Body: { "email": "admin@dayflow.com" }

Response (400):
{
  "statusCode": 400,
  "message": ["password should not be empty", "password must be a string"],
  "error": "Bad Request"
}
```

---

## Security Features Implemented

✅ **Password Hashing:** Bcrypt with 10 salt rounds
✅ **JWT Tokens:** 1-day expiration
✅ **Role-Based Access Control (RBAC):** @Roles decorator + RolesGuard
✅ **Input Validation:** class-validator DTOs
✅ **Protected Routes:** JwtAuthGuard
✅ **Password Stripped:** Never returned in responses

---

## Next Steps

In Phase 3, we'll use these guards to protect:
- Employee CRUD endpoints (HR/Admin only)
- Auto-generated employee codes
- Profile management with role checks
