// Mock employee data
export const currentEmployee = {
  id: "EMP-2024-001",
  firstName: "John",
  lastName: "Doe",
  fullName: "John Doe",
  email: "john.doe@company.com",
  phone: "+1 (555) 123-4567",
  role: "Senior Software Engineer",
  department: "Engineering",
  company: "TechCorp Inc.",
  manager: "Jane Smith",
  office: "San Francisco, CA",
  startDate: "2022-03-15",
  dateOfBirth: "1990-06-20",
  gender: "Male",
  address: "123 Main Street, San Francisco, CA 94102",
  emergencyContact: {
    name: "Sarah Doe",
    relationship: "Spouse",
    phone: "+1 (555) 987-6543",
  },
  skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
  certifications: [
    { name: "AWS Solutions Architect", issuer: "Amazon", date: "2023-05" },
    { name: "Professional Scrum Master", issuer: "Scrum.org", date: "2022-11" },
  ],
  documents: [
    { name: "Employment Contract", type: "PDF", date: "2022-03-15" },
    { name: "NDA Agreement", type: "PDF", date: "2022-03-15" },
    { name: "ID Verification", type: "PDF", date: "2022-03-10" },
  ],
  payroll: {
    salary: "$145,000 / year",
    payFrequency: "Bi-weekly",
    bankName: "Chase Bank",
    accountLast4: "4892",
    taxId: "***-**-1234",
  },
};

// Today's attendance
export const todayAttendance = {
  date: new Date().toISOString().split("T")[0],
  checkIn: "09:02 AM",
  checkOut: null,
  totalHours: "4h 32m",
  status: "present" as const,
  isCheckedIn: true,
};

// Weekly work hours
export const weeklyHours = [
  { day: "Mon", hours: 8.5 },
  { day: "Tue", hours: 9.0 },
  { day: "Wed", hours: 7.5 },
  { day: "Thu", hours: 8.0 },
  { day: "Fri", hours: 4.5 },
];

// Leave balance
export const leaveBalance = {
  paidLeave: { used: 5, total: 20 },
  sickLeave: { used: 2, total: 10 },
  personalLeave: { used: 1, total: 3 },
};

// Attendance history
export const attendanceHistory = [
  { date: "2026-01-03", checkIn: "09:02 AM", checkOut: "—", totalHours: "4h 32m", status: "present" },
  { date: "2026-01-02", checkIn: "08:55 AM", checkOut: "06:30 PM", totalHours: "9h 35m", status: "present" },
  { date: "2026-01-01", checkIn: "—", checkOut: "—", totalHours: "—", status: "holiday" },
  { date: "2025-12-31", checkIn: "09:10 AM", checkOut: "05:45 PM", totalHours: "8h 35m", status: "present" },
  { date: "2025-12-30", checkIn: "08:45 AM", checkOut: "06:00 PM", totalHours: "9h 15m", status: "present" },
  { date: "2025-12-29", checkIn: "—", checkOut: "—", totalHours: "—", status: "weekend" },
  { date: "2025-12-28", checkIn: "—", checkOut: "—", totalHours: "—", status: "weekend" },
  { date: "2025-12-27", checkIn: "—", checkOut: "—", totalHours: "—", status: "leave" },
  { date: "2025-12-26", checkIn: "09:00 AM", checkOut: "05:30 PM", totalHours: "8h 30m", status: "present" },
  { date: "2025-12-25", checkIn: "—", checkOut: "—", totalHours: "—", status: "holiday" },
];

// Leave history
export const leaveHistory = [
  {
    id: "LV-001",
    type: "Paid Leave",
    startDate: "2025-12-27",
    endDate: "2025-12-27",
    days: 1,
    reason: "Personal errands",
    status: "approved",
    appliedOn: "2025-12-20",
    approvedBy: "Jane Smith",
  },
  {
    id: "LV-002",
    type: "Sick Leave",
    startDate: "2025-12-15",
    endDate: "2025-12-16",
    days: 2,
    reason: "Not feeling well",
    status: "approved",
    appliedOn: "2025-12-14",
    approvedBy: "Jane Smith",
  },
  {
    id: "LV-003",
    type: "Paid Leave",
    startDate: "2026-01-15",
    endDate: "2026-01-17",
    days: 3,
    reason: "Family vacation",
    status: "pending",
    appliedOn: "2025-12-28",
    approvedBy: null,
  },
  {
    id: "LV-004",
    type: "Personal Leave",
    startDate: "2025-11-20",
    endDate: "2025-11-20",
    days: 1,
    reason: "Doctor's appointment",
    status: "approved",
    appliedOn: "2025-11-18",
    approvedBy: "Jane Smith",
  },
  {
    id: "LV-005",
    type: "Paid Leave",
    startDate: "2025-10-05",
    endDate: "2025-10-06",
    days: 2,
    reason: "Moving to new apartment",
    status: "rejected",
    appliedOn: "2025-09-28",
    approvedBy: null,
  },
];

export const leaveTypes = [
  { value: "paid", label: "Paid Leave" },
  { value: "sick", label: "Sick Leave" },
  { value: "personal", label: "Personal Leave" },
  { value: "unpaid", label: "Unpaid Leave" },
];
