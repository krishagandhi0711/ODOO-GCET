import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo validation
    if (!formData.identifier || !formData.password) {
      setError("Please enter your credentials");
      setIsLoading(false);
      return;
    }

    // Demo: check for first-time login
    if (formData.password === "changeme") {
      setIsLoading(false);
      navigate("/first-time-login");
      return;
    }

    // Demo success
    setIsLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col transition-theme">
      {/* Top bar with theme toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl shadow-soft-md">
                D
              </div>
              <span className="text-2xl font-semibold text-foreground">Dayflow</span>
            </div>
          </div>

          {/* Login card */}
          <div className="bg-card rounded-2xl shadow-soft-lg border border-border p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-foreground mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to your Dayflow account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error message */}
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {/* Employee ID / Email */}
              <div className="space-y-2">
                <label htmlFor="identifier" className="block text-sm font-medium text-foreground">
                  Employee ID or Email
                </label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="Enter your ID or email"
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  disabled={isLoading}
                  autoComplete="username"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                    autoComplete="current-password"
                    className="pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                size="xl"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin-slow" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Having trouble signing in?{" "}
            <a href="mailto:support@dayflow.com" className="text-primary hover:text-primary/80 transition-colors">
              Contact IT Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
