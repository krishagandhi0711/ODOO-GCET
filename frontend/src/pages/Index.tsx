import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem('dayflow-user-role');

    if (savedRole) {
      // User is logged in, redirect to appropriate dashboard
      if (savedRole === 'admin') {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      // User is not logged in, show landing page
      navigate("/landing");
    }
  }, [navigate]);

  return null;
};

export default Index;
