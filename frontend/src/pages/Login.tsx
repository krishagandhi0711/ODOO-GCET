import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const resetSuccess = searchParams.get("reset") === "success";

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetSuccess, setShowResetSuccess] = useState(resetSuccess);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (resetSuccess) {
      // Auto-hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowResetSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [resetSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate input
      if (!formData.identifier || !formData.password) {
        setError("Please enter your credentials");
        setIsLoading(false);
        return;
      }

      // Call real login API
      await login(formData.identifier, formData.password);

      // Navigate based on user role
      const userRole = localStorage.getItem('dayflow-user-role');
      navigate(userRole === 'admin' ? '/admin/dashboard' : '/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden transition-theme">
      {/* Background Subtle Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Glows */}
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Grid Pattern (Matching Main App) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Theme toggle - Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10 transition-smooth">
        <div className="w-full max-w-[420px] page-enter">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center mb-10 group">
            <div className="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 mb-4 transition-transform duration-500 group-hover:scale-110">
              <span className="text-2xl font-bold tracking-tighter">D</span>
              <div className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dayflow</h1>
            <p className="text-sm text-muted-foreground mt-1.5 font-medium">Enterprise Resource Management</p>
          </div>

          {/* Login Card */}
          <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-white/5 border-t-white/10 shadow-2xl shadow-black/20">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Security Header */}
            <div className="flex items-center justify-center gap-2 mb-8 py-2 px-4 rounded-full bg-primary/5 border border-primary/10 w-fit mx-auto">
              <Lock className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">Secured Access</span>
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground">Sign In</h2>
              <p className="text-sm text-muted-foreground mt-1">Access your professional workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success message for password reset */}
              {showResetSuccess && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="font-medium">Password reset successful! You can now sign in.</span>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-destructive/90">{error}</span>
                </div>
              )}

              {/* Employee ID / Email */}
              <div className="space-y-2.5">
                <label htmlFor="identifier" className="text-sm font-semibold text-foreground/80 ml-1">
                  Employee ID or Email
                </label>
                <div className="relative group">
                  <Input
                    id="identifier"
                    type="text"
                    placeholder="Enter your credentials"
                    value={formData.identifier}
                    onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    disabled={isLoading}
                    autoComplete="username"
                    className="h-12 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center ml-1">
                  <label htmlFor="password" className="text-sm font-semibold text-foreground/80">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-smooth"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    disabled={isLoading}
                    autoComplete="current-password"
                    className="h-12 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 transform active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Authenticating...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Sign In</span>
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </form>

            {/* Support Information */}
            <div className="mt-10 pt-6 border-t border-muted/30 text-center">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Only administrators can grant access or reset accounts.
              </p>
            </div>
          </div>

          {/* Footer Branding */}
          <div className="mt-8 flex items-center justify-center gap-2 text-muted-foreground/60 text-[11px] font-bold uppercase tracking-widest">
            <span className="h-px w-8 bg-muted/40" />
            <span>Powered by Dayflow Foundation</span>
            <span className="h-px w-8 bg-muted/40" />
          </div>
        </div>
      </div>
    </div>
  );
}