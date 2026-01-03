# PHASE 5: Payroll Engine - Testing Guide

## 🎯 Overview
The Payroll Engine transforms your HRMS from a simple "Tracker" into a complete "Business Tool" by automatically calculating salaries based on attendance and leave data.

## 🔑 Key Features

### 1. **Dynamic Calculation (No Stored Payroll)**
- Payslips are computed on-the-fly
- Always reflects the latest attendance and leave data
- No database records for payroll (pure computation)

### 2. **Smart Unpaid Leave Deduction**
- Automatically detects APPROVED + UNPAID leaves
- Calculates per-day wage: `Monthly Wage ÷ Days in Month`
- Deducts: `Daily Wage × Unpaid Days`

### 3. **Standard Salary Components**
**Earnings:**
- Basic Salary: 50% of Monthly Wage
- HRA: 50% of Basic Salary
- Special Allowance: Balancing amount

**Deductions:**
- PF: 12% of Basic Salary
- Professional Tax: ₹200 (flat)
- Leave Deduction: Dynamic based on unpaid leaves

### 4. **Role-Based Access**
- **Employee**: Can only view their own payslip
- **Admin/HR**: Can view any employee's payslip

---

## 🚀 Manual Testing Scenarios

### **Scenario 1: Full Salary (No Unpaid Leaves)**

**Setup:**
1. Ensure an employee has `monthly_wage` set in `salary_structures` table
2. Ensure NO unpaid leaves for the current month

**Steps:**
```bash
# As Admin
GET /payroll/1?month=1&year=2026
Authorization: Bearer {admin_token}
```

**Expected Result:**
```json
{
  "earnings": {
    "basic": 30000,
    "hra": 15000,
    "special_allowance": 15000,
    "total": 60000
  },
  "deductions": {
    "pf": 3600,
    "professional_tax": 200,
    "leave_deduction": 0,  // ← Should be ZERO
    "total": 3800
  },
  "summary": {
    "net_payable": 56200  // ← Full salary
  },
  "stats": {
    "unpaid_leave_days": 0,  // ← No unpaid leaves
    "total_working_days": 31
  }
}
```

**✅ Pass Criteria:**
- `leave_deduction` = 0
- `unpaid_leave_days` = 0
- `net_payable` ≈ ₹56,200 (for ₹60K wage)

---

### **Scenario 2: Salary with Unpaid Leave Deduction**

**Setup:**
1. Apply for 3 days unpaid leave (e.g., Jan 5-7, 2026)
2. Admin approves the leave
3. Regenerate payslip

**Steps:**
```bash
# 1. Apply Unpaid Leave (As Employee)
POST /leaves
{
  "type": "UNPAID",
  "start_date": "2026-01-05",
  "end_date": "2026-01-07",
  "reason": "Personal work"
}

# 2. Approve Leave (As Admin)
PATCH /leaves/{id}/status
{
  "status": "APPROVED"
}

# 3. Get Payslip (As Admin)
GET /payroll/1?month=1&year=2026
```

**Expected Result:**
```json
{
  "deductions": {
    "pf": 3600,
    "professional_tax": 200,
    "leave_deduction": 5806,  // ← 3 days × ₹1935/day
    "total": 9606
  },
  "summary": {
    "gross_earning": 54194,  // ← Reduced by 3 days
    "net_payable": 50394     // ← Less than full salary
  },
  "stats": {
    "unpaid_leave_days": 3,
    "daily_wage": 1935,
    "effective_working_days": 28
  }
}
```

**✅ Pass Criteria:**
- `unpaid_leave_days` = 3
- `leave_deduction` > 0
- `net_payable` < previous payslip (salary drop visible)

---

### **Scenario 3: Employee Self-Service**

**Steps:**
```bash
# As Employee (using their JWT token)
GET /payroll/me?month=1&year=2026
Authorization: Bearer {employee_token}
```

**Expected Result:**
- Should see their own payslip
- Should NOT be able to see other employees' payslips

**✅ Pass Criteria:**
- Employee gets their own payslip successfully
- Attempting `GET /payroll/2` (other employee) returns 403 Forbidden

---

### **Scenario 4: Multi-Month History**

**Steps:**
```bash
# As Admin
GET /payroll/1/history?limit=6
```

**Expected Result:**
- Returns last 6 months of payslips
- Each month calculated independently

**✅ Pass Criteria:**
- Array of 6 payslips returned
- Each has correct month/year
- Leave deductions vary by month

---

## 🧪 Automated Testing

Run the automated test suite:

```bash
cd backend
node test-phase5.js
```

**What It Tests:**
1. ✅ Full salary calculation (no unpaid leaves)
2. ✅ Apply and approve 3 days unpaid leave
3. ✅ Recalculate salary with deduction
4. ✅ Employee self-service access
5. ✅ Admin access to any payslip

**Expected Output:**
```
💰 PHASE 5: Testing Payroll Engine
════════════════════════════════════════════════════════════
📝 Step 1: Setup Admin & Test Employee with Salary...
✅ Admin logged in
✅ Test employee created: ODOO-DH-2026-XXX
✅ Monthly wage set to ₹60,000

💵 TEST 1: Full salary calculation (No unpaid leaves)
   NET PAYABLE: ₹56,200
   Unpaid Leave Days: 0
✅ TEST 1 PASSED

✈️  TEST 2: Apply 3 days unpaid leave & approve it
   Leave Applied: UNPAID (Jan 5-7)
   Leave Status: APPROVED

💸 TEST 3: Recalculate salary with unpaid leave deduction
   🔴 Leave Deduction: ₹5,806 (3 days × ₹1,935/day)
   NET PAYABLE: ₹50,394
   📉 SALARY DROP: ₹5,806
✅ TEST 3 PASSED

👤 TEST 4: Employee viewing their own payslip
   Net Payable: ₹50,394
   Unpaid Leave Days: 3
✅ TEST 4 PASSED

🎉 ALL PHASE 5 TESTS PASSED!
```

---

## 🎓 Hackathon Demo Script

**"The Money Shot" Demonstration:**

1. **Open Postman/Thunder Client**

2. **Show Full Salary (Baseline):**
   ```
   GET /payroll/1?month=1&year=2026
   
   "Look at the Net Payable: ₹56,200. Zero leave deduction."
   ```

3. **Apply Unpaid Leave:**
   ```
   POST /leaves
   {
     "type": "UNPAID",
     "start_date": "2026-01-05",
     "end_date": "2026-01-07"
   }
   
   "I'm applying for 3 days unpaid leave."
   ```

4. **Approve Leave:**
   ```
   PATCH /leaves/1/status
   { "status": "APPROVED" }
   
   "Admin approves it."
   ```

5. **Show Deduction:**
   ```
   GET /payroll/1?month=1&year=2026
   
   "Notice the leave_deduction: ₹5,806! 
    Net Payable dropped to ₹50,394.
    The system AUTOMATICALLY calculated the deduction!"
   ```

6. **The Punchline:**
   > "This is not just an attendance tracker. This is a **Business Tool**. 
   > No HR person needs to open Excel. The system calculates salaries 
   > based on REAL attendance data, automatically deducting for unpaid leaves.
   > That's the power of an integrated HRMS."

---

## 🐛 Troubleshooting

### Issue: "Salary structure not configured"
**Solution:** Ensure `salary_structures` table has a record:
```sql
INSERT INTO salary_structures (employee_id, monthly_wage)
VALUES (1, 60000.00);
```

### Issue: "Leave deduction is 0" (but unpaid leave exists)
**Check:**
1. Is leave `status = 'APPROVED'`?
2. Is leave `type = 'UNPAID'`?
3. Does leave date range overlap with the queried month?

### Issue: Employee can't see own payslip
**Check:**
1. Is `user_id` linked to `employee` record?
2. Is JWT token valid and contains correct `userId`?

---

## 📊 Business Logic Breakdown

### For Monthly Wage = ₹60,000:

**Earnings:**
- Basic (50%): ₹30,000
- HRA (50% of Basic): ₹15,000
- Special Allowance (Balance): ₹15,000
- **Total**: ₹60,000

**Deductions:**
- PF (12% of Basic): ₹3,600
- Professional Tax: ₹200
- Leave Deduction (3 days): ₹5,806
  - Calculation: `₹60,000 ÷ 31 days = ₹1,935/day`
  - `₹1,935 × 3 days = ₹5,806`
- **Total**: ₹9,606

**Net Payable:**
```
₹60,000 (Gross) - ₹5,806 (Leave) - ₹3,600 (PF) - ₹200 (Tax) = ₹50,394
```

---

## 🎯 Success Criteria

✅ **Phase 5 is complete when:**
1. Payslip API returns all components correctly
2. Unpaid leave deduction is calculated dynamically
3. Salary drops when unpaid leaves are added
4. Employee can view own payslip
5. Admin can view any payslip
6. Automated tests pass 100%

---

## 🚀 Next Steps

After Phase 5, your HRMS is **production-ready** with:
- ✅ JWT Authentication (Phase 2)
- ✅ Employee Management with auto-IDs (Phase 3)
- ✅ Attendance & Leave with constraints (Phase 4)
- ✅ Payroll with dynamic salary calculation (Phase 5)

**Ready to win the hackathon! 🏆**
