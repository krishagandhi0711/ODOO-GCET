# Phase 4: Attendance & Leave Testing Guide

## 🎯 The Constraints Engine - Testing the Smart Logic

This phase implements the "Unified Pipeline" - where attendance and leaves are interconnected with smart constraints.

---

## Prerequisites

1. **Server Running**: `npm run start:dev`
2. **Test Users Available**:
   - Admin: `admin@dayflow.com` / `admin123`
   - Employee: Use any employee created in Phase 3

---

## 🔧 Test Scenario 1: Normal Workflow (Happy Path)

### Step 1: Login as Employee

```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "rahul.sharma.1736000000000@dayflow.com",
  "password": "Welcome@123"
}
```

**Save the token!**

---

### Step 2: Check Today's Status (Before Check-In)

```http
GET http://localhost:3000/attendance/status
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

**Expected Response:**
```json
{
  "status": "ABSENT",
  "icon": "🟡",
  "message": "You have not checked in today",
  "canCheckIn": true,
  "canCheckOut": false
}
```

---

### Step 3: Check-In (The Green Dot Appears)

```http
POST http://localhost:3000/attendance/check-in
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

**Expected Response:**
```json
{
  "id": 1,
  "employee_id": 1,
  "attendance_date": "2026-01-03T00:00:00.000Z",
  "check_in_time": "2026-01-03T08:30:45.123Z",
  "check_out_time": null,
  "status": "PRESENT",
  "worked_hours": null,
  "employees": {
    "full_name": "Rahul Sharma",
    "employee_code": "ODOO-DH-2026-001",
    "department": "Engineering"
  }
}
```

---

### Step 4: Check Status Again (Should Show Green Dot)

```http
GET http://localhost:3000/attendance/status
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

**Expected Response:**
```json
{
  "status": "PRESENT",
  "icon": "🟢",
  "message": "You are currently checked in",
  "checkInTime": "2026-01-03T08:30:45.123Z",
  "canCheckIn": false,
  "canCheckOut": true
}
```

✅ **Success Criteria**: Icon shows 🟢, `canCheckOut` is true

---

### Step 5: Check-Out (Complete the Day)

```http
POST http://localhost:3000/attendance/check-out
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

**Expected Response:**
```json
{
  "id": 1,
  "check_in_time": "2026-01-03T08:30:45.123Z",
  "check_out_time": "2026-01-03T17:45:23.456Z",
  "worked_hours": 9.24,
  "status": "PRESENT",
  "remarks": "Worked 9.24 hours"
}
```

---

## 🚫 Test Scenario 2: Double Check-In (Should Fail)

**After checking in once, try again:**

```http
POST http://localhost:3000/attendance/check-in
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

**Expected Response:**
```json
{
  "statusCode": 409,
  "message": "You have already checked in today. Please check out first.",
  "error": "Conflict"
}
```

✅ **Success Criteria**: Returns 409 Conflict

---

## ✈️ Test Scenario 3: The "Airplane Block" (Core Constraint)

This tests the magic: **Cannot check in when on approved leave.**

### Step 1: Apply for Leave (As Employee)

```http
POST http://localhost:3000/leaves
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
Content-Type: application/json

{
  "type": "PAID",
  "start_date": "2026-01-03",
  "end_date": "2026-01-03",
  "reason": "Personal work"
}
```

**Expected**: Leave created with `status: "PENDING"`

---

### Step 2: Approve the Leave (As Admin)

First, login as admin and get the leave ID from the response above (let's say it's ID 1):

```http
PATCH http://localhost:3000/leaves/1/status
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "status": "APPROVED"
}
```

**Expected**: Leave status changed to `APPROVED`

---

### Step 3: Try to Check-In (Should Fail with Airplane Message)

```http
POST http://localhost:3000/attendance/check-in
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

**Expected Response:**
```json
{
  "statusCode": 409,
  "message": "✈️ You are on approved leave today. No need to check in! Enjoy your break.",
  "error": "Conflict"
}
```

✅ **Success Criteria**: Employee blocked from check-in with airplane emoji

---

### Step 4: Check Status (Should Show Airplane Icon)

```http
GET http://localhost:3000/attendance/status
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

**Expected Response:**
```json
{
  "status": "ON_LEAVE",
  "icon": "✈️",
  "message": "You are on approved leave today",
  "canCheckIn": false
}
```

✅ **Success Criteria**: Dashboard shows ✈️ instead of 🟢

---

## 🔄 Test Scenario 4: Leave Overlap Validation

Try to apply for overlapping leave dates.

### Step 1: Apply for First Leave

```http
POST http://localhost:3000/leaves
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
Content-Type: application/json

{
  "type": "SICK",
  "start_date": "2026-01-10",
  "end_date": "2026-01-12",
  "reason": "Medical checkup"
}
```

---

### Step 2: Try to Apply Overlapping Leave (Should Fail)

```http
POST http://localhost:3000/leaves
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
Content-Type: application/json

{
  "type": "CASUAL",
  "start_date": "2026-01-11",
  "end_date": "2026-01-13",
  "reason": "Trip"
}
```

**Expected Response:**
```json
{
  "statusCode": 409,
  "message": "Leave request overlaps with an existing request. Please choose different dates.",
  "error": "Conflict"
}
```

✅ **Success Criteria**: System prevents overlapping leaves

---

## 📊 Test Scenario 5: Dashboard APIs

### Get Leave Statistics

```http
GET http://localhost:3000/leaves/statistics
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

**Expected Response:**
```json
{
  "total": 2,
  "pending": 1,
  "approved": 1,
  "rejected": 0
}
```

---

### Get Attendance Statistics

```http
GET http://localhost:3000/attendance/statistics
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

**Expected Response:**
```json
{
  "totalDays": 5,
  "presentDays": 5,
  "averageHoursPerDay": "8.75",
  "attendanceRate": "100.00"
}
```

---

### Get Attendance History

```http
GET http://localhost:3000/attendance/history?limit=10
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

Returns last 10 attendance records.

---

## 🎖️ Admin-Only Tests

### View All Leave Requests (Admin/HR)

```http
GET http://localhost:3000/leaves
Authorization: Bearer YOUR_ADMIN_TOKEN
```

Returns all employees' leave requests.

---

### View All Attendance Records (Admin/HR)

```http
GET http://localhost:3000/attendance/history
Authorization: Bearer YOUR_ADMIN_TOKEN
```

Returns attendance for all employees.

---

### Get Specific Employee Attendance (Admin/HR)

```http
GET http://localhost:3000/attendance/employee/1?startDate=2026-01-01&endDate=2026-01-31
Authorization: Bearer YOUR_ADMIN_TOKEN
```

Returns filtered attendance for employee ID 1.

---

## 🧪 Advanced Test Scenario: Retroactive Leave Prevention

### Step 1: Check In for Today

```http
POST http://localhost:3000/attendance/check-in
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
```

---

### Step 2: Try to Apply Leave for Today (Should Fail)

```http
POST http://localhost:3000/leaves
Authorization: Bearer YOUR_EMPLOYEE_TOKEN
Content-Type: application/json

{
  "type": "SICK",
  "start_date": "2026-01-03",
  "end_date": "2026-01-03",
  "reason": "Not feeling well"
}
```

**Expected Response:**
```json
{
  "statusCode": 409,
  "message": "You already have attendance records for these dates. Cannot apply leave retroactively.",
  "error": "Conflict"
}
```

✅ **Success Criteria**: Cannot apply leave after marking attendance

---

## 🏆 Phase 4 Verification Checklist

Test all these scenarios and check them off:

- [ ] ✅ Normal check-in creates attendance record
- [ ] 🟢 Status API returns green dot when checked in
- [ ] 🚫 Double check-in returns 409 Conflict
- [ ] ⏰ Check-out calculates worked hours correctly
- [ ] ✈️ Approved leave blocks check-in with airplane message
- [ ] 🟡 Status shows yellow dot when not checked in
- [ ] 🔄 Overlapping leave requests are rejected
- [ ] 🛡️ Cannot apply leave for days with attendance
- [ ] 📊 Statistics APIs return correct counts
- [ ] 🎖️ Admin can see all leaves and attendance
- [ ] 👤 Employees see only their own records

---

## 🎉 Success Indicators

If all tests pass, your system demonstrates:

1. **Data Integrity**: Attendance and leave tables enforce mutual exclusivity
2. **Real-Time Logic**: Status API updates based on actual database state
3. **Role-Based Security**: Admins and employees have appropriate access
4. **User Experience**: Clear error messages with emojis guide users

**This is hackathon-winning logic!** 🏆

---

## 🐛 Troubleshooting

**Issue**: Check-in works but leave constraint doesn't block it.
- **Fix**: Ensure LeavesModule is imported in AttendanceModule
- **Verify**: Check `attendance.module.ts` has `imports: [LeavesModule]`

**Issue**: "Employee profile not found"
- **Fix**: Employee record must exist with matching `user_id`
- **Verify**: Run employee creation from Phase 3 first

**Issue**: Dates not matching for leave constraint
- **Fix**: Ensure date comparison uses start/end of day boundaries
- **Check**: `isEmployeeOnLeave()` logic in leaves.service.ts
