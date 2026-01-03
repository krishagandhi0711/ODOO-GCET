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

// --- Admin Data Merged ---

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  status: 'present' | 'on-leave' | 'absent';
  joinDate: string;
  avatar: string;
  salary: {
    basic: number;
    hra: number;
    allowances: number;
    pfDeduction: number;
    taxDeduction: number;
  };
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  leaveType: 'paid' | 'sick' | 'unpaid' | 'casual';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
}

export const employees: Employee[] = [
  {
    id: '1',
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@company.com',
    phone: '+1 (555) 234-5678',
    department: 'Engineering',
    role: 'Senior Software Engineer',
    status: 'present',
    joinDate: '2022-03-15',
    avatar: 'SC',
    salary: { basic: 8500, hra: 2125, allowances: 1500, pfDeduction: 1020, taxDeduction: 1800 }
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'Torres',
    email: 'michael.torres@company.com',
    phone: '+1 (555) 345-6789',
    department: 'Design',
    role: 'Product Designer',
    status: 'present',
    joinDate: '2021-08-22',
    avatar: 'MT',
    salary: { basic: 7200, hra: 1800, allowances: 1200, pfDeduction: 864, taxDeduction: 1400 }
  },
  {
    id: '3',
    firstName: 'Emily',
    lastName: 'Watson',
    email: 'emily.watson@company.com',
    phone: '+1 (555) 456-7890',
    department: 'Marketing',
    role: 'Marketing Manager',
    status: 'on-leave',
    joinDate: '2020-11-10',
    avatar: 'EW',
    salary: { basic: 7800, hra: 1950, allowances: 1400, pfDeduction: 936, taxDeduction: 1550 }
  },
  {
    id: '4',
    firstName: 'James',
    lastName: 'Anderson',
    email: 'james.anderson@company.com',
    phone: '+1 (555) 567-8901',
    department: 'Finance',
    role: 'Financial Analyst',
    status: 'present',
    joinDate: '2023-01-05',
    avatar: 'JA',
    salary: { basic: 6500, hra: 1625, allowances: 1100, pfDeduction: 780, taxDeduction: 1200 }
  },
  {
    id: '5',
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@company.com',
    phone: '+1 (555) 678-9012',
    department: 'Engineering',
    role: 'DevOps Engineer',
    status: 'present',
    joinDate: '2022-06-18',
    avatar: 'PS',
    salary: { basic: 7500, hra: 1875, allowances: 1300, pfDeduction: 900, taxDeduction: 1450 }
  },
  {
    id: '6',
    firstName: 'David',
    lastName: 'Kim',
    email: 'david.kim@company.com',
    phone: '+1 (555) 789-0123',
    department: 'Sales',
    role: 'Sales Executive',
    status: 'absent',
    joinDate: '2021-04-30',
    avatar: 'DK',
    salary: { basic: 5800, hra: 1450, allowances: 1000, pfDeduction: 696, taxDeduction: 1050 }
  },
  {
    id: '7',
    firstName: 'Lisa',
    lastName: 'Johnson',
    email: 'lisa.johnson@company.com',
    phone: '+1 (555) 890-1234',
    department: 'HR',
    role: 'HR Coordinator',
    status: 'present',
    joinDate: '2023-02-14',
    avatar: 'LJ',
    salary: { basic: 5500, hra: 1375, allowances: 950, pfDeduction: 660, taxDeduction: 980 }
  },
  {
    id: '8',
    firstName: 'Robert',
    lastName: 'Martinez',
    email: 'robert.martinez@company.com',
    phone: '+1 (555) 901-2345',
    department: 'Engineering',
    role: 'Tech Lead',
    status: 'on-leave',
    joinDate: '2019-09-08',
    avatar: 'RM',
    salary: { basic: 9500, hra: 2375, allowances: 1800, pfDeduction: 1140, taxDeduction: 2100 }
  },
  {
    id: '9',
    firstName: 'Amanda',
    lastName: 'Davis',
    email: 'amanda.davis@company.com',
    phone: '+1 (555) 012-3456',
    department: 'Operations',
    role: 'Operations Manager',
    status: 'present',
    joinDate: '2020-07-22',
    avatar: 'AD',
    salary: { basic: 7000, hra: 1750, allowances: 1250, pfDeduction: 840, taxDeduction: 1350 }
  },
  {
    id: '10',
    firstName: 'Kevin',
    lastName: 'Brown',
    email: 'kevin.brown@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Design',
    role: 'UX Researcher',
    status: 'present',
    joinDate: '2022-11-28',
    avatar: 'KB',
    salary: { basic: 6800, hra: 1700, allowances: 1150, pfDeduction: 816, taxDeduction: 1280 }
  }
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: 'lr1',
    employeeId: '3',
    employeeName: 'Emily Watson',
    employeeAvatar: 'EW',
    leaveType: 'paid',
    startDate: '2024-01-15',
    endDate: '2024-01-19',
    reason: 'Family vacation',
    status: 'pending',
    appliedOn: '2024-01-08'
  },
  {
    id: 'lr2',
    employeeId: '8',
    employeeName: 'Robert Martinez',
    employeeAvatar: 'RM',
    leaveType: 'sick',
    startDate: '2024-01-12',
    endDate: '2024-01-14',
    reason: 'Medical appointment and recovery',
    status: 'pending',
    appliedOn: '2024-01-10'
  },
  {
    id: 'lr3',
    employeeId: '1',
    employeeName: 'Sarah Chen',
    employeeAvatar: 'SC',
    leaveType: 'casual',
    startDate: '2024-01-22',
    endDate: '2024-01-22',
    reason: 'Personal work',
    status: 'pending',
    appliedOn: '2024-01-11'
  },
  {
    id: 'lr4',
    employeeId: '5',
    employeeName: 'Priya Sharma',
    employeeAvatar: 'PS',
    leaveType: 'unpaid',
    startDate: '2024-02-01',
    endDate: '2024-02-05',
    reason: 'Extended travel for personal reasons',
    status: 'pending',
    appliedOn: '2024-01-09'
  },
  {
    id: 'lr5',
    employeeId: '2',
    employeeName: 'Michael Torres',
    employeeAvatar: 'MT',
    leaveType: 'paid',
    startDate: '2024-01-25',
    endDate: '2024-01-26',
    reason: 'Attending a conference',
    status: 'approved',
    appliedOn: '2024-01-05'
  },
  {
    id: 'lr6',
    employeeId: '7',
    employeeName: 'Lisa Johnson',
    employeeAvatar: 'LJ',
    leaveType: 'sick',
    startDate: '2024-01-08',
    endDate: '2024-01-09',
    reason: 'Feeling unwell',
    status: 'approved',
    appliedOn: '2024-01-07'
  }
];

export const departments = ['All', 'Engineering', 'Design', 'Marketing', 'Finance', 'Sales', 'HR', 'Operations'];

export const dashboardStats = {
  totalEmployees: employees.length,
  presentToday: employees.filter(e => e.status === 'present').length,
  onLeave: employees.filter(e => e.status === 'on-leave').length,
  pendingRequests: leaveRequests.filter(l => l.status === 'pending').length
};
