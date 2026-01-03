import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Loader2, ShieldCheck, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [identifier, setIdentifier] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Demo validation
        if (!identifier) {
            setError("Please enter your Employee ID or email address");
            setIsLoading(false);
            return;
        }

        // Email validation (basic)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmail = emailRegex.test(identifier);

        if (isEmail || identifier.length >= 3) {
            // Success - show confirmation
            setSuccess(true);
            setIsLoading(false);
        } else {
            setError("Please enter a valid Employee ID or email address");
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

                    {/* Forgot Password Card */}
                    <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-white/5 border-t-white/10 shadow-2xl shadow-black/20">
                        {/* Top accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                        {!success ? (
                            <>
                                {/* Header */}
                                <div className="flex items-center justify-center gap-2 mb-8 py-2 px-4 rounded-full bg-primary/5 border border-primary/10 w-fit mx-auto">
                                    <Mail className="h-3.5 w-3.5 text-primary" />
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">Account Recovery</span>
                                </div>

                                <div className="mb-8 text-center">
                                    <h2 className="text-2xl font-bold text-foreground">Forgot Password?</h2>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Enter your Employee ID or email address and we'll send you a secure recovery link.
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

                                    {/* Employee ID / Email */}
                                    <div className="space-y-2.5">
                                        <label htmlFor="identifier" className="text-sm font-semibold text-foreground/80 ml-1">
                                            Employee ID or Email Address
                                        </label>
                                        <div className="relative group">
                                            <Input
                                                id="identifier"
                                                type="text"
                                                placeholder="Enter your ID or email"
                                                value={identifier}
                                                onChange={(e) => setIdentifier(e.target.value)}
                                                disabled={isLoading}
                                                autoComplete="username"
                                                className="h-12 bg-background/30 border-muted/50 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all duration-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Info helper */}
                                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 animate-fade-in">
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            The recovery link will be sent to the official email address registered with your professional profile.
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
                                                <span>Initializing...</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-5 w-5" />
                                                <span>Send Recovery Link</span>
                                            </div>
                                        )}
                                    </Button>

                                    {/* Back to login */}
                                    <Link
                                        to="/login"
                                        className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth pt-2"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Sign In
                                    </Link>
                                </form>
                            </>
                        ) : (
                            // Success State
                            <div className="text-center space-y-6 py-4 animate-fade-in">
                                <div className="flex justify-center">
                                    <div className="relative h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                                        <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping opacity-20" />
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
                                    <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
                                        A secure recovery link has been dispatched to the email associated with <span className="text-primary font-bold">{identifier}</span>
                                    </p>
                                </div>

                                <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 text-left space-y-3">
                                    <p className="text-xs font-bold text-primary uppercase tracking-widest">Next steps:</p>
                                    <ul className="space-y-2">
                                        {[
                                            'Check your inbox and spam folder',
                                            'Click the link within 24 hours',
                                            'Set a new professional password'
                                        ].map((step, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground/90">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
                                                <span>{step}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="pt-4 space-y-4">
                                    <p className="text-xs text-muted-foreground/60 font-medium">
                                        Didn't receive the digital dispatch?
                                    </p>
                                    <Button
                                        onClick={() => {
                                            setSuccess(false);
                                            setIdentifier("");
                                        }}
                                        variant="outline"
                                        className="w-full h-11 border-muted/50 font-bold hover:bg-muted/10 rounded-xl"
                                    >
                                        Resend Link
                                    </Button>
                                    <Link
                                        to="/login"
                                        className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-smooth"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Return to Sign In
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Support Information */}
                    <div className="mt-8 text-center space-y-4">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Only administrators can manually override or verify accounts.
                        </p>
                    </div>

                    {/* Footer Branding */}
                    <div className="mt-10 flex items-center justify-center gap-2 text-muted-foreground/60 text-[11px] font-bold uppercase tracking-widest">
                        <span className="h-px w-8 bg-muted/40" />
                        <span>Powered by Dayflow Foundation</span>
                        <span className="h-px w-8 bg-muted/40" />
                    </div>
                </div>
            </div>
        </div>
    );
}