import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
    Users,
    Clock,
    Calendar,
    DollarSign,
    Shield,
    ArrowRight,
    CheckCircle2,
    Database,
    BarChart3,
    FileCheck,
    Building2,
    Zap,
    Lock,
    Cpu,
    Globe,
    Rocket
} from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background relative selection:bg-primary/20">
            {/* Global Background Grid Pattern - Enhanced with atmospheric orbs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:45px_45px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />

                {/* Atmospheric Ambient Orbs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px] animate-bounce-slow" />
                <div className="absolute top-[40%] right-[10%] w-[20%] h-[20%] bg-primary/5 rounded-full blur-[80px]" />
            </div>

            {/* Navigation - Floating & Rounded */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="glass rounded-2xl border border-border/40 backdrop-blur-xl shadow-lg px-6 py-3 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                                D
                            </div>
                            <span className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">Dayflow</span>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-8">
                            <div className="hidden md:flex items-center gap-8">
                                <a href="#features" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all">Features</a>
                                <a href="#pricing" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all">Pricing</a>
                                <a href="mailto:support@dayflow.com" className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-all">Support</a>
                            </div>
                            <div className="flex items-center gap-4">
                                <ThemeToggle />
                                <Button
                                    onClick={() => navigate('/login')}
                                    className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 px-8 h-10 font-bold"
                                >
                                    Sign In
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center pt-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                                <div className="space-y-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20 backdrop-blur-sm">
                                        <Building2 className="h-4 w-4" />
                                        NEXT-GEN HR PLATFORM
                                    </div>

                                    <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
                                        Complete HR <br />
                                        <span className="text-primary italic">Operations</span> in <br />
                                        One System
                                    </h1>

                                    <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                                        Manage your entire workforce—from attendance tracking to payroll processing—with enterprise-grade tools built for modern organizations.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        size="lg"
                                        onClick={() => navigate('/login')}
                                        className="h-14 px-10 gap-3 rounded-2xl text-lg font-bold shadow-2xl shadow-primary/25 hover:scale-105 transition-all duration-300"
                                    >
                                        Access Workspace
                                        <ArrowRight className="h-5 w-5" />
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        onClick={() => navigate('/login')}
                                        className="h-14 px-10 rounded-2xl text-lg font-bold hover:bg-background/80 hover:scale-105 transition-all duration-300"
                                    >
                                        Documentation
                                    </Button>
                                </div>

                                <div className="flex items-center gap-10 pt-4">
                                    <div className="group cursor-default">
                                        <div className="text-4xl font-black text-foreground group-hover:text-primary transition-colors">500+</div>
                                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Organizations</div>
                                    </div>
                                    <div className="h-12 w-px bg-border/50" />
                                    <div className="group cursor-default">
                                        <div className="text-4xl font-black text-foreground group-hover:text-primary transition-colors">50K+</div>
                                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Active Users</div>
                                    </div>
                                    <div className="h-12 w-px bg-border/50" />
                                    <div className="group cursor-default">
                                        <div className="text-4xl font-black text-foreground group-hover:text-primary transition-colors">99.9%</div>
                                        <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Uptime</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual - Dashboard Preview */}
                            <div className="relative animate-in fade-in zoom-in duration-1000 delay-200">
                                {/* Glow Background */}
                                <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] animate-pulse" />

                                <div className="glass-strong rounded-[2.5rem] border border-white/10 p-8 shadow-2xl relative overflow-hidden">
                                    {/* Mock Dashboard Header */}
                                    <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground font-black text-lg shadow-lg">
                                                KG
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground text-lg">Krisha Gandhi</div>
                                                <div className="text-sm text-muted-foreground font-medium">Lead Software Engineer</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                            ACTIVE NOW
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-5 mb-8">
                                        <div className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                            <div className="flex items-center justify-between mb-3">
                                                <Clock className="h-6 w-6 text-primary" />
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Daily Shift</span>
                                            </div>
                                            <div className="text-3xl font-black text-foreground">8.5h</div>
                                            <div className="text-xs text-muted-foreground font-bold">Tracked Today</div>
                                        </div>
                                        <div className="p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                                            <div className="flex items-center justify-between mb-3">
                                                <Calendar className="h-6 w-6 text-primary" />
                                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">Time Off</span>
                                            </div>
                                            <div className="text-3xl font-black text-foreground">12d</div>
                                            <div className="text-xs text-muted-foreground font-bold">Paid Balance</div>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <FileCheck className="h-5 w-5 text-primary" />
                                                </div>
                                                <span className="font-bold text-foreground">Apply for Leave</span>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/50 hover:bg-white/10 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <DollarSign className="h-5 w-5 text-primary" />
                                                </div>
                                                <span className="font-bold text-foreground">Payroll History</span>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 px-6 py-3 rounded-2xl bg-background border border-border shadow-2xl animate-bounce-slow">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                            <Shield className="h-5 w-5 text-emerald-500" />
                                        </div>
                                        <span className="text-sm font-black text-foreground tracking-tight">ISO CERTIFIED SECURE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Modules Section */}
                <section id="features" className="py-32 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8">
                            <h2 className="text-5xl font-black text-foreground mb-6 leading-tight">
                                Integrated HR Modules
                            </h2>
                            <p className="text-xl text-muted-foreground font-medium">
                                Powerful tools designed to manage your entire organizational lifecycle with ease and precision.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: Users,
                                    title: 'Employee Suite',
                                    desc: 'Dynamic workforce database with skill tracking, hierarchy, and digital file cabinets.'
                                },
                                {
                                    icon: Clock,
                                    title: 'Time Intel',
                                    desc: 'Ai-powered attendance tracking with geofencing and smart shift rotation.'
                                },
                                {
                                    icon: Calendar,
                                    title: 'Leave Flow',
                                    desc: 'Automated policy enforcement and digital approval workflows for global teams.'
                                },
                                {
                                    icon: DollarSign,
                                    title: 'Pay Engine',
                                    desc: 'Precision payroll with multi-currency support and localized tax compliance.'
                                }
                            ].map((module, i) => (
                                <div key={i} className="group p-8 rounded-[2.5rem] bg-secondary/30 border-2 border-foreground/5 hover:border-primary/40 hover:bg-secondary/50 hover:shadow-2xl transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
                                    <div className="absolute top-6 right-8 text-4xl font-black text-foreground/5 group-hover:text-primary/10 transition-colors uppercase tracking-tighter">0{i + 1}</div>
                                    <div className="h-16 w-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-transform group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20">
                                        <module.icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">
                                        {module.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed font-bold text-sm uppercase tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                                        {module.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Access Control Section */}
                <section className="py-32 bg-muted/20 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <h2 className="text-5xl font-black text-foreground mb-6">
                                Role-Based Control
                            </h2>
                            <p className="text-xl text-muted-foreground font-medium">
                                Granular permissions that protect sensitive data while empowering your team.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10">
                            {/* Employee Portal */}
                            <div className="p-10 rounded-[2.5rem] bg-card border border-border shadow-2xl relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Users className="h-32 w-32" />
                                </div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-14 w-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                                        <Users className="h-7 w-7 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-foreground">Employee Portal</h3>
                                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Self-Service Access</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        'Update verified personal profiles',
                                        'Biometric-synced clock in/out',
                                        'Direct leave request submissions',
                                        'Instant payslip & tax downloads',
                                        'Shared organizational directory'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group/item">
                                            <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                            </div>
                                            <span className="text-foreground font-semibold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Admin Dashboard */}
                            <div className="p-10 rounded-[2.5rem] bg-card border border-border shadow-2xl relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Shield className="h-32 w-32" />
                                </div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <Shield className="h-7 w-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-foreground">Admin Command</h3>
                                        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">System Orchestration</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {[
                                        'E2E Employee Lifecycle Management',
                                        'Global Policy & Compliance Setup',
                                        'High-Volume Payroll Processing',
                                        'Multi-Level Approval Chains',
                                        'Real-time Analytics & Audit Logs'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group/item">
                                            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="text-foreground font-semibold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section - Architectural Tiering */}
                <section id="pricing" className="py-32 relative">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8">
                            <h2 className="text-5xl font-black text-foreground mb-6 leading-tight">
                                Scalable <span className="text-primary font-black">Architecture</span>
                            </h2>
                            <p className="text-xl text-muted-foreground font-medium">
                                Professional resource management infrastructure tailored for organizations of every scale.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8 items-stretch pt-12">
                            {/* Starter Tier */}
                            <div className="p-10 rounded-[3rem] bg-secondary/20 border-2 border-foreground/5 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="h-14 w-14 rounded-2xl bg-foreground/5 flex items-center justify-center border border-foreground/10">
                                            <Rocket className="h-7 w-7 text-foreground/40" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-foreground/5 px-4 py-1.5 rounded-full border border-foreground/5">Base Protocol</span>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Essential</h3>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Operations Core</p>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-6xl font-black text-foreground tracking-tighter">$0</span>
                                        <span className="text-sm font-black text-muted-foreground uppercase opacity-40">/mo</span>
                                    </div>
                                    <div className="h-px w-full bg-foreground/10" />
                                    <div className="space-y-5">
                                        {['Up to 25 Employees', 'Core Identity Profiles', 'Base Clock Protocol', 'Standard Leave Units'].map((f, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                                                </div>
                                                <span className="text-sm font-bold text-foreground/70 uppercase tracking-wide">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-foreground/10 font-black uppercase tracking-widest hover:bg-foreground hover:text-background transition-all mt-10">
                                    Initialize Unit
                                </Button>
                            </div>

                            {/* Business Tier - THE HIGHLIGHT */}
                            <div className="p-10 rounded-[3rem] bg-secondary/80 border-2 border-primary shadow-2xl hover:shadow-primary/20 transition-all duration-500 group relative overflow-hidden scale-105 z-20 flex flex-col justify-between">
                                <div className="absolute top-0 right-0 p-8 flex items-center gap-2">
                                    <div className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">Recommended Configuration</div>
                                </div>
                                <div className="space-y-8 relative z-10 pt-4">
                                    <div className="flex items-center justify-between">
                                        <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/30">
                                            <Cpu className="h-9 w-9 text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-4xl font-black text-foreground uppercase tracking-tight">Growth</h3>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Advanced Neural Engine</p>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-7xl font-black text-foreground tracking-tighter">$49</span>
                                        <span className="text-sm font-black text-muted-foreground uppercase opacity-40">/mo</span>
                                    </div>
                                    <div className="h-px w-full bg-primary/20" />
                                    <div className="space-y-5">
                                        {['Up to 250 Employees', 'Integrated Payroll Unit', 'Advanced Document Matrix', 'Analytics Intelligence', 'Custom Approval Flows'].map((f, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-sm font-black text-foreground uppercase tracking-tight">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Button className="w-full h-18 rounded-2xl bg-primary text-white font-black uppercase tracking-widest shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all mt-12 text-base">
                                    Deploy Infrastructure
                                </Button>
                            </div>

                            {/* Enterprise Tier */}
                            <div className="p-10 rounded-[3rem] bg-secondary/20 border-2 border-foreground/5 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden flex flex-col justify-between">
                                <div className="space-y-8 relative z-10">
                                    <div className="flex items-center justify-between">
                                        <div className="h-14 w-14 rounded-2xl bg-foreground/5 flex items-center justify-center border border-foreground/10">
                                            <Globe className="h-7 w-7 text-foreground/40" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-foreground/5 px-4 py-1.5 rounded-full border border-foreground/5">Global Access</span>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Sovereign</h3>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Universal Command</p>
                                    </div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-6xl font-black text-foreground tracking-tighter">Custom</span>
                                    </div>
                                    <div className="h-px w-full bg-foreground/10" />
                                    <div className="space-y-5">
                                        {['Unlimited Employee Matrix', 'Multi-Regional Currency', 'Custom Policy Forge', 'White-label Architecture', '24/7 Priority Ops'].map((f, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <CheckCircle2 className="h-3 w-3 text-primary" />
                                                </div>
                                                <span className="text-sm font-bold text-foreground/70 uppercase tracking-wide">{f}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full h-16 rounded-2xl border-2 border-foreground/10 font-black uppercase tracking-widest hover:bg-foreground hover:text-background transition-all mt-10">
                                    Contact Command
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section className="py-32">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="glass-strong rounded-[3rem] p-12 lg:p-20 border border-white/5 relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 h-64 w-64 bg-primary/10 rounded-full blur-[100px]" />
                            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                                <div className="space-y-8">
                                    <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center shadow-xl shadow-primary/30 animate-pulse">
                                        <Lock className="h-10 w-10 text-primary-foreground" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-5xl font-black text-foreground leading-[1.1]">
                                            Sovereign Data <br />
                                            <span className="text-primary font-black">Security</span>
                                        </h2>
                                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                                            Your organizational data is treated with military-grade precision. Everything from AWS encryption to physical server security is managed for your peace of mind.
                                        </p>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <Database className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">Encrypted</div>
                                                <div className="text-xs text-muted-foreground font-bold">AES-256 Storage</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <FileCheck className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-foreground">Audited</div>
                                                <div className="text-xs text-muted-foreground font-bold">Continuous Logs</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center animate-spin-slow">
                                        <Shield className="h-40 w-40 text-primary/40" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Zap className="h-20 w-20 text-primary animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-40 relative">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 h-40 w-40 bg-primary/30 rounded-full blur-[80px]" />
                        <h2 className="text-6xl font-black text-foreground mb-8 tracking-tighter">
                            Ready for the <br />
                            <span className="text-primary font-black">Future</span> of HR?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-12 font-medium">
                            Join the elite organizations transforming their workforce management with Dayflow.
                        </p>
                        <div className="flex items-center justify-center gap-6">
                            <Button
                                size="lg"
                                onClick={() => navigate('/login')}
                                className="h-16 px-12 rounded-2xl text-xl font-black shadow-2xl shadow-primary/35 hover:scale-110 active:scale-95 transition-all"
                            >
                                Sign In Now
                                <ArrowRight className="h-6 w-6 ml-2" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => window.location.href = 'mailto:support@dayflow.com'}
                                className="h-16 px-12 rounded-2xl text-xl font-bold backdrop-blur-sm hover:bg-background/80 transition-all"
                            >
                                Get Support
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-border/40 py-16 backdrop-blur-md bg-background/30">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="flex items-center gap-4 group">
                                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg transition-transform group-hover:rotate-12">
                                    D
                                </div>
                                <div className="text-left">
                                    <div className="font-black text-foreground text-lg tracking-tight">DAYFLOW HRMS</div>
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enterprise Edition 2026</div>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-black text-muted-foreground uppercase tracking-widest">
                                <span>© 2026 Dayflow Technologies</span>
                                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                                <a href="#" className="hover:text-primary transition-colors">Compliance</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}