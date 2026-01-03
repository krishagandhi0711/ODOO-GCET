import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

export default function FirstTimeLogin() {
  const navigate = useNavigate();
  const { setRole } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) return 'weak';
    if (password.length < 10) return 'medium';
    return 'strong';
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, newPassword: password });
    setPasswordStrength(checkPasswordStrength(password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    setRole("employee");
    setIsLoading(false);
    navigate("/dashboard");
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
        <div className="w-full max-w-[440px] page-enter">
          {/* Logo & Brand */}
          <div className="flex flex-col items-center mb-10 group">
            <div className="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 mb-4 transition-transform duration-500 group-hover:scale-110">
              <span className="text-2xl font-bold tracking-tighter">D</span>
              <div className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Dayflow</h1>
            <p className="text-sm text-muted-foreground mt-1.5 font-medium">Enterprise Resource Management</p>
          </div>

          {/* Setup Card */}
          <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-white/5 border-t-white/10 shadow-2xl shadow-black/20">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            {/* Security Header */}
            <div className="flex items-center justify-center gap-2 mb-8 py-2 px-4 rounded-full bg-primary/5 border border-primary/10 w-fit mx-auto">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">Security Setup</span>
            </div>

            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground">Secure Your Account</h2>
              <p className="text-sm text-muted-foreground mt-2">
                This is your first login. Please set a strong password to protect your professional profile.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error message */}
              {error && (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                  <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="font-medium text-destructive/90">{error}</span>
                </div>
              )}

              {/* New Password */}
              <div className="space-y-2.5">
                <label htmlFor="newPassword" className="text-sm font-semibold text-foreground/80 ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.newPassword}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    disabled={isLoading}
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

                {/* Password Strength Indicator */}
                {formData.newPassword && (
                  <div className="mt-3 px-1 animate-fade-in">
                    <div className="flex gap-1.5 mb-1.5 h-1">
                      <div className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength === 'weak' ? 'bg-red-500' : 'bg-primary'}`} />
                      <div className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength === 'medium' ? 'bg-amber-500' : passwordStrength === 'strong' ? 'bg-primary' : 'bg-muted/40'}`} />
                      <div className={`flex-1 rounded-full transition-all duration-500 ${passwordStrength === 'strong' ? 'bg-primary' : 'bg-muted/40'}`} />
                    </div>
                    <p className={`text-[10px] uppercase font-bold tracking-wider ${passwordStrength === 'weak' ? 'text-red-500' : passwordStrength === 'medium' ? 'text-amber-500' : 'text-primary'}`}>
                      Strength: {passwordStrength}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2.5">
                <label htmlFor="confirmPassword" className="text-sm font-semibold text-foreground/80 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    disabled={isLoading}
                    className="h-12 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                  <div className="flex items-center gap-1.5 text-xs text-primary font-medium mt-2 ml-1 animate-fade-in">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Passwords match</span>
                  </div>
                )}
              </div>

              {/* Requirement Hint */}
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-primary font-bold mr-1">Policy:</span>
                  Minimal length of 8 chars. We recommend using a unique phrase with numbers.
                </p>
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
                    <span>Activating Session...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Activate Account</span>
                  </div>
                )}
              </Button>
            </form>
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