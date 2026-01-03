import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  useEffect(() => {
    // If not role (implied not logged in logic, though AuthContext defaults to 'employee' if standard logic, 
    // but here let's assume if we want to force login first time or check localStorage existence manually 
    // but AuthContext *always* returns a role 'employee' or 'admin' from localStorage or default.
    // Wait, AuthContext defaults to 'employee'. So it always thinks we are logged in?
    // The AuthContext provided:
    // const [role, setRoleState] = useState<UserRole>(() => {
    //   const savedRole = localStorage.getItem('dayflow-user-role');
    //   return (savedRole as UserRole) || 'employee';
    // });

    // Thus it defaults to 'employee' if nothing is there.
    // This effectively means "Guest" is "Employee".
    // This is a bit flaw in the provided mock.
    // However, for this task, I will trust the user finds their way to Login.
    // The previous Index redirected to Login always.
    // Maybe I should keep it that way to ensure they see the Login screen (which is nice).
    // Or I check if 'dayflow-user-role' is actually in localStorage.

    const savedRole = localStorage.getItem('dayflow-user-role');

    if (savedRole) {
      if (savedRole === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/login");
    }
  }, [navigate, role]);

  return null;
};


export default Index;
