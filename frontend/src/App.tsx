import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { AttendanceProvider } from "@/contexts/AttendanceContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import FirstTimeLogin from "./pages/FirstTimeLogin";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Attendance from "./pages/Attendance";
import TimeOff from "./pages/TimeOff";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployees from "./pages/admin/AdminEmployees";
import AdminLeaveApprovals from "./pages/admin/AdminLeaveApprovals";
import AdminPayroll from "./pages/admin/AdminPayroll";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <AuthProvider>
          <AttendanceProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public/Common Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/first-time-login" element={<FirstTimeLogin />} />

                {/* Employee Routes - Protected */}
                <Route element={<ProtectedRoute allowedRoles={['employee']} />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/attendance" element={<Attendance />} />
                  <Route path="/time-off" element={<TimeOff />} />
                </Route>

                {/* Admin Routes - Protected (Admin only) */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/admin/employees" element={<AdminEmployees />} />
                  <Route path="/admin/leave-approvals" element={<AdminLeaveApprovals />} />
                  <Route path="/admin/payroll" element={<AdminPayroll />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AttendanceProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
