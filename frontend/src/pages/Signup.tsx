import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
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

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
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
        <div className="min-h-screen bg-background flex flex-col transition-theme">
            {/* Top bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
                <ThemeToggle />
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center justify-center p-4 pt-20">
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

                    {/* Signup card */}
                    <div className="bg-card rounded-2xl shadow-soft-lg border border-border p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-semibold text-foreground mb-2">Create your account</h1>
                            <p className="text-muted-foreground">Join Dayflow and start managing your work</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Error message */}
                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                                    {error}
                                </div>
                            )}

                            {/* Name fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground">
                                        First Name
                                    </label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground">
                                        Last Name
                                    </label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john.doe@company.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    disabled={isLoading}
                                    autoComplete="email"
                                />
                            </div>

                            {/* Employee ID */}
                            <div className="space-y-2">
                                <label htmlFor="employeeId" className="block text-sm font-medium text-foreground">
                                    Employee ID
                                </label>
                                <Input
                                    id="employeeId"
                                    type="text"
                                    placeholder="EMP-2024-001"
                                    value={formData.employeeId}
                                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                                    disabled={isLoading}
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
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        disabled={isLoading}
                                        autoComplete="new-password"
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

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Re-enter your password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        disabled={isLoading}
                                        autoComplete="new-password"
                                        className="pr-11"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
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
                                        Creating account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
