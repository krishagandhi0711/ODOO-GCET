import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck, UserPlus, Lock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/contexts/AuthContext';

export default function Signup() {
    const navigate = useNavigate();
    const { setRole } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        employeeId: '',
        password: '',
        confirmPassword: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.employeeId || !formData.password) {
            setError('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            setIsLoading(false);
            return;
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Demo: Set role as employee for new signups
        setRole('employee');

        // Success - navigate to dashboard
        setIsLoading(false);
        navigate('/dashboard');
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

            {/* Top bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="gap-2 hover:bg-white/5 text-muted-foreground hover:text-foreground transition-smooth"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Landing
                </Button>
                <ThemeToggle />
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center p-6 relative z-10 transition-smooth mt-12 md:mt-0">
                <div className="w-full max-w-[480px] page-enter">
                    {/* Logo & Brand */}
                    <div className="flex flex-col items-center mb-10 group">
                        <div className="relative flex items-center justify-center h-16 w-16 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 mb-4 transition-transform duration-500 group-hover:scale-110">
                            <span className="text-2xl font-bold tracking-tighter">D</span>
                            <div className="absolute inset-0 rounded-2xl bg-primary animate-ping opacity-20" />
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dayflow</h1>
                        <p className="text-sm text-muted-foreground mt-1.5 font-medium text-center">Join the Modern Enterprise Workspace</p>
                    </div>

                    {/* Signup card */}
                    <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-white/5 border-t-white/10 shadow-2xl shadow-black/20">
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                        {/* Header */}
                        <div className="flex items-center justify-center gap-2 mb-8 py-2 px-4 rounded-full bg-primary/5 border border-primary/10 w-fit mx-auto">
                            <UserPlus className="h-3.5 w-3.5 text-primary" />
                            <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">Account Creation</span>
                        </div>

                        <div className="mb-8 text-center">
                            <h2 className="text-2xl font-bold text-foreground">Get Started</h2>
                            <p className="text-sm text-muted-foreground mt-1 text-center">Create your professional employee profile</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Error message */}
                            {error && (
                                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                                    <span className="font-medium">{error}</span>
                                </div>
                            )}

                            {/* Name fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-xs font-bold text-foreground/70 uppercase tracking-wider ml-1">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="Krisha"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                            disabled={isLoading}
                                            className="h-11 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-10 transition-all duration-300"
                                        />
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-xs font-bold text-foreground/70 uppercase tracking-wider ml-1">
                                        Last Name
                                    </label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Gandhi"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        disabled={isLoading}
                                        className="h-11 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-bold text-foreground/70 uppercase tracking-wider ml-1">
                                    Corporate Email
                                </label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="krisha.gandhi@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={isLoading}
                                        autoComplete="email"
                                        className="h-11 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-10 transition-all duration-300"
                                    />
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Employee ID */}
                            <div className="space-y-2">
                                <label htmlFor="employeeId" className="text-xs font-bold text-foreground/70 uppercase tracking-wider ml-1">
                                    Employee ID
                                </label>
                                <div className="relative">
                                    <Input
                                        id="employeeId"
                                        type="text"
                                        placeholder="EMP-2026-XXXX"
                                        value={formData.employeeId}
                                        onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                        disabled={isLoading}
                                        className="h-11 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-10 transition-all duration-300"
                                    />
                                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-xs font-bold text-foreground/70 uppercase tracking-wider ml-1">
                                    Secure Password
                                </label>
                                <div className="relative group">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        disabled={isLoading}
                                        autoComplete="new-password"
                                        className="h-11 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-10 pr-12 transition-all duration-300"
                                    />
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-xs font-bold text-foreground/70 uppercase tracking-wider ml-1">
                                    Verify Password
                                </label>
                                <div className="relative group">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        disabled={isLoading}
                                        autoComplete="new-password"
                                        className="h-11 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl pl-10 pr-12 transition-all duration-300"
                                    />
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit button */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-xl shadow-lg shadow-primary/25 transition-all duration-300 transform active:scale-[0.98] mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span>Create Account</span>
                                        <ArrowLeft className="h-5 w-5 rotate-180" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Footer Links */}
                    <div className="mt-8 text-center space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            By signing up, you agree to our{' '}
                            <Link to="#" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                            <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>.
                        </p>
                        <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-bold text-[10px] opacity-60">
                            Already part of the team?{' '}
                            <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-extrabold ml-1">
                                Sign In
                            </Link>
                        </p>
                    </div>

                    {/* Branding */}
                    <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground/40 text-[10px] font-bold uppercase tracking-widest">
                        <span className="h-px w-8 bg-muted/20" />
                        <span>Powered by Dayflow Foundation</span>
                        <span className="h-px w-8 bg-muted/20" />
                    </div>
                </div>
            </div>
        </div>
    );
}
