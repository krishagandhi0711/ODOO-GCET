# ✅ Integration Testing Checklist

Use this checklist to verify that all features are working correctly after integration.

## 🔧 Setup Verification

### Backend Setup
- [ ] PostgreSQL database is running
- [ ] Database `dayflow_hrms` exists
- [ ] Migrations have been run successfully
- [ ] Backend server starts without errors (`npm run start:dev`)
- [ ] Backend is accessible at `http://localhost:3000`
- [ ] No console errors in backend terminal

### Frontend Setup
- [ ] Frontend dependencies installed
- [ ] Environment variables configured (`.env`)
- [ ] Frontend server starts without errors (`npm run dev`)
- [ ] Frontend is accessible at `http://localhost:5173`
- [ ] No console errors in browser DevTools

---

## 🔐 Authentication Tests

### Login Functionality
- [ ] Login page loads correctly
- [ ] Can login with valid credentials
- [ ] Shows error message for invalid credentials
- [ ] JWT token is stored in localStorage after login
- [ ] Token has format: `dayflow_access_token`
- [ ] Redirects to correct page based on role (admin/employee)

### Token Management
- [ ] Token is automatically attached to API requests
- [ ] Token is visible in Network tab → Headers → Authorization
- [ ] Token format: `Bearer <token>`
- [ ] Page refresh maintains login state
- [ ] Logout clears token from localStorage
- [ ] Logout redirects to login page

### Protected Routes
- [ ] Cannot access protected routes without login
- [ ] Unauthorized access redirects to login page
- [ ] Role-based routing works (admin/employee)
- [ ] Admin can access admin routes
- [ ] Employee cannot access admin routes

---

## 👤 Employee Module Tests

### Profile Page
- [ ] Profile page loads without errors
- [ ] Real employee data is displayed (not mock data)
- [ ] Employee name is shown correctly
- [ ] Employee code is displayed
- [ ] Email is displayed
- [ ] Department is shown (if available)
- [ ] Designation is shown (if available)
- [ ] Profile completion percentage is calculated
- [ ] All personal info fields display correctly
- [ ] Date formatting is correct

### Admin Employee Management
- [ ] Can access employee list page (admin only)
- [ ] Employee table loads with real data
- [ ] Search functionality works
- [ ] Can filter employees by name
- [ ] Can filter employees by email
- [ ] Can filter employees by department
- [ ] Click "Add Employee" opens modal
- [ ] Can create new employee successfully
- [ ] Success toast appears after creation
- [ ] New employee appears in list
- [ ] Can edit existing employee
- [ ] Can delete employee (with confirmation)
- [ ] Employee statistics are accurate

---

## 📅 Attendance Module Tests

### Attendance Tracking
- [ ] Attendance page loads correctly
- [ ] Check-in button is available
- [ ] Can check-in successfully
- [ ] Check-in time is recorded
- [ ] Check-in button becomes check-out button
- [ ] Can check-out successfully
- [ ] Check-out time is recorded
- [ ] Worked hours are calculated correctly
- [ ] Cannot check-in twice in same day
- [ ] Appropriate error messages are shown

### Attendance Status
- [ ] Current attendance status is displayed
- [ ] Green dot shows when checked in
- [ ] Status updates in real-time
- [ ] Today's attendance record is shown
- [ ] Total hours for today are displayed

### Attendance History
- [ ] Attendance history table loads
- [ ] Past attendance records are displayed
- [ ] Date formatting is correct
- [ ] Check-in and check-out times are shown
- [ ] Total hours are calculated
- [ ] Status badges show correct colors
- [ ] Can filter by date range (if implemented)

### Attendance Statistics
- [ ] Statistics card shows correct data
- [ ] Total present days count is accurate
- [ ] Absent days count is correct
- [ ] Average working hours is calculated
- [ ] Statistics update after check-in/out

---

## 🏖️ Leave Management Tests

### Leave Application
- [ ] TimeOff page loads correctly
- [ ] Leave balance cards show correct data
- [ ] Can open leave application modal
- [ ] Leave type dropdown works
- [ ] Date pickers work correctly
- [ ] Start date validation works
- [ ] End date must be after start date
- [ ] Can enter leave reason
- [ ] Can submit leave application
- [ ] Success toast appears
- [ ] New leave appears in history

### Leave History
- [ ] Leave history table loads
- [ ] Past leave requests are displayed
- [ ] Leave type is shown correctly
- [ ] Date range is formatted correctly
- [ ] Number of days is calculated
- [ ] Leave status badge shows correct color
- [ ] PENDING shows amber/yellow
- [ ] APPROVED shows green
- [ ] REJECTED shows red
- [ ] Can cancel pending leaves
- [ ] Cannot cancel approved/rejected leaves

### Leave Statistics
- [ ] Leave balance shows correct numbers
- [ ] Used leave count is accurate
- [ ] Total leave count is correct
- [ ] Available leave is calculated correctly
- [ ] Statistics update after application

---

## 💰 Payroll Module Tests

### Employee Payslip View
- [ ] Payroll page loads correctly
- [ ] Current month payslip is displayed
- [ ] Employee name is shown
- [ ] Employee code is shown
- [ ] Pay period is displayed correctly
- [ ] Basic salary is shown
- [ ] Allowances are listed
- [ ] Deductions are listed
- [ ] Gross salary is calculated
- [ ] Net salary is calculated correctly

### Payslip History
- [ ] Can view past payslips
- [ ] Month/year selector works
- [ ] Payslip history table loads
- [ ] Past payslips are displayed
- [ ] Can click to view specific payslip
- [ ] Download button is available (if implemented)

### Admin Payroll View
- [ ] Admin can view all employee payslips
- [ ] Can select specific employee
- [ ] Can view payslip for any month
- [ ] All calculations are correct

---

## 👨‍💼 Admin Module Tests

### Admin Dashboard
- [ ] Dashboard loads with real statistics
- [ ] Total employees count is accurate
- [ ] Present today count is correct
- [ ] On leave count is accurate
- [ ] Pending requests count is correct
- [ ] Statistics cards show correct colors
- [ ] Quick action buttons work
- [ ] "Add Employee" button navigates correctly
- [ ] "View Employees" button works
- [ ] "Leave Approvals" button works

### Admin Employee Management
- [ ] Can create new employees
- [ ] Email validation works
- [ ] Password validation works
- [ ] Required fields are enforced
- [ ] Role dropdown works (Admin/HR/Employee)
- [ ] Department field saves correctly
- [ ] Can update employee information
- [ ] Can delete employees
- [ ] Confirmation dialog appears before delete
- [ ] Search functionality works
- [ ] Employee list updates after changes

### Admin Leave Approvals
- [ ] Pending leave requests are listed
- [ ] Can approve leave requests
- [ ] Can reject leave requests
- [ ] Status updates immediately
- [ ] Employee is notified (if implemented)
- [ ] Approved leaves move to history
- [ ] Leave balance updates after approval

---

## 🚨 Error Handling Tests

### Network Errors
- [ ] Shows error when backend is down
- [ ] "Network error" message is displayed
- [ ] Retry button appears (if implemented)
- [ ] Toast notification shows error

### Authentication Errors
- [ ] 401 error redirects to login
- [ ] Token expiration is handled
- [ ] Shows "Session expired" message
- [ ] Clears token on 401

### Validation Errors
- [ ] Shows validation errors from backend
- [ ] Error messages are user-friendly
- [ ] Required field errors are displayed
- [ ] Format errors are shown (email, etc.)

### Permission Errors
- [ ] 403 error shows permission denied
- [ ] Cannot access admin routes as employee
- [ ] Shows appropriate error message
- [ ] Does not crash the application

---

## 🎨 UX/UI Tests

### Loading States
- [ ] Shows loading spinner during API calls
- [ ] Loading spinner appears for login
- [ ] Loading spinner on data fetch
- [ ] Loading states don't block UI unnecessarily

### Toast Notifications
- [ ] Success toasts appear (green)
- [ ] Error toasts appear (red)
- [ ] Warning toasts appear (amber)
- [ ] Info toasts appear (blue)
- [ ] Toasts auto-dismiss after timeout
- [ ] Multiple toasts can stack
- [ ] Toast messages are clear

### Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on laptop (1366x768)
- [ ] Works on tablet (768px width)
- [ ] Works on mobile (375px width)
- [ ] Tables scroll horizontally on small screens
- [ ] Modals fit on small screens
- [ ] Buttons are touchable on mobile

---

## 🔄 Data Consistency Tests

### Real-time Updates
- [ ] Attendance status updates immediately
- [ ] Leave balance updates after application
- [ ] Employee list updates after CRUD
- [ ] Dashboard statistics are current

### Data Accuracy
- [ ] Employee count matches database
- [ ] Attendance records are accurate
- [ ] Leave balances are calculated correctly
- [ ] Payroll calculations are accurate

### Data Persistence
- [ ] Data persists after page refresh
- [ ] Login state persists
- [ ] Form data doesn't disappear unexpectedly
- [ ] Changes are saved to database

---

## 🌐 Browser Compatibility

### Chrome
- [ ] All features work in Chrome
- [ ] No console errors
- [ ] Styling is correct

### Firefox
- [ ] All features work in Firefox
- [ ] No console errors
- [ ] Styling is correct

### Safari (if available)
- [ ] All features work in Safari
- [ ] No console errors
- [ ] Styling is correct

### Edge
- [ ] All features work in Edge
- [ ] No console errors
- [ ] Styling is correct

---

## 🔒 Security Tests

### Authentication
- [ ] Cannot access API without token
- [ ] Token is required for protected routes
- [ ] Invalid token returns 401
- [ ] Expired token returns 401

### Authorization
- [ ] Employee cannot access admin routes
- [ ] Employee cannot delete other employees
- [ ] Employee cannot approve leaves
- [ ] Role enforcement works correctly

### Data Security
- [ ] Passwords are never exposed
- [ ] Sensitive data is protected
- [ ] CORS is properly configured
- [ ] No sensitive data in console logs

---

## 📱 Additional Features

### Search and Filter
- [ ] Employee search works
- [ ] Case-insensitive search
- [ ] Filter by department works
- [ ] Clear filters button works

### Sorting (if implemented)
- [ ] Can sort by name
- [ ] Can sort by date
- [ ] Can sort by status
- [ ] Sort direction toggles

### Pagination (if implemented)
- [ ] Shows correct number of items per page
- [ ] Can navigate between pages
- [ ] Page numbers are correct
- [ ] Shows total count

---

## 📊 Performance Tests

### Page Load Times
- [ ] Login page loads < 2 seconds
- [ ] Dashboard loads < 3 seconds
- [ ] Employee list loads < 3 seconds
- [ ] Large tables load reasonably fast

### API Response Times
- [ ] Login API responds < 500ms
- [ ] GET requests respond < 300ms
- [ ] POST requests respond < 500ms
- [ ] No unnecessary API calls

### Bundle Size
- [ ] Frontend bundle is optimized
- [ ] No unused dependencies
- [ ] Images are optimized
- [ ] Code is minified for production

---

## 🧪 Edge Cases

### Empty States
- [ ] Shows "No employees" when list is empty
- [ ] Shows "No attendance records" when empty
- [ ] Shows "No leave requests" when empty
- [ ] Empty states have appropriate messages

### Boundary Cases
- [ ] Can handle very long names
- [ ] Can handle special characters
- [ ] Can handle unicode characters
- [ ] Date validations work correctly

### Error Recovery
- [ ] Can retry after network error
- [ ] Can recover from failed API call
- [ ] Form data isn't lost on error
- [ ] Application doesn't crash on error

---

## 📝 Final Checklist

### Documentation
- [ ] README is up to date
- [ ] Integration guide is complete
- [ ] Quick start guide is clear
- [ ] API endpoints are documented
- [ ] Environment variables are documented

### Code Quality
- [ ] No console.log in production code
- [ ] No commented-out code blocks
- [ ] TypeScript errors are resolved
- [ ] Lint errors are fixed
- [ ] Code is properly formatted

### Deployment Ready
- [ ] Environment variables are set
- [ ] Database migrations are ready
- [ ] Build scripts work correctly
- [ ] Production build is tested
- [ ] CORS is configured for production

---

## ✅ Sign-off

**Tested By:** _________________  
**Date:** _________________  
**Environment:** _________________  
**Browser(s):** _________________

### Overall Status
- [ ] All critical features working
- [ ] All major features working
- [ ] Minor issues documented
- [ ] Ready for production deployment

### Issues Found
List any issues discovered during testing:

1. 
2. 
3. 

### Notes
Additional observations or comments:



---

## 🎉 Testing Complete!

Once all items are checked, the integration is verified and ready for deployment!

**Remember:**
- Test in a clean environment
- Test with different user roles
- Test on different browsers
- Document any issues found
- Retest after fixes

---

**Last Updated:** January 3, 2026
