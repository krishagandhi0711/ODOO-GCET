import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
    Building2,
    Users,
    TrendingUp,
    Clock,
    Calendar,
    Shield,
    Zap,
    CheckCircle2,
    ArrowRight,
    BarChart3,
    FileText,
    Award
} from 'lucide-react';

export default function Landing() {
    const navigate = useNavigate();

    const features = [
        {
            icon: Users,
            title: 'Employee Database',
            description: 'Centralized employee information with complete profiles, documents, and history tracking.'
        },
        {
            icon: Clock,
            title: 'Attendance System',
            description: 'Real-time attendance tracking with automated reports and shift management.'
        },
        {
            icon: Calendar,
            title: 'Leave Management',
            description: 'Streamlined leave requests with approval workflows and balance tracking.'
        },
        {
            icon: TrendingUp,
            title: 'Payroll Automation',
            description: 'Accurate salary processing with tax calculations and compliance management.'
        },
        {
            icon: BarChart3,
            title: 'Analytics & Reports',
            description: 'Comprehensive insights with customizable dashboards and data visualization.'
        },
        {
            icon: Shield,
            title: 'Security & Compliance',
            description: 'Enterprise-grade security with role-based access and data encryption.'
        }
    ];

    const stats = [
        { value: '500+', label: 'Companies Trust Us' },
        { value: '50K+', label: 'Active Users' },
        { value: '99.9%', label: 'Uptime SLA' },
        { value: '24/7', label: 'Support Available' }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation - Rounded and Floating */}
            <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="glass rounded-full border border-border/40 backdrop-blur-xl shadow-lg px-6 py-3 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => navigate('/landing')}>
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-lg text-white transition-transform duration-300 hover:rotate-12">
                                D
                            </div>
                            <span className="text-lg font-semibold text-foreground">Dayflow</span>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            <ThemeToggle />
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/login')}
                                className="hidden sm:inline-flex rounded-full transition-all duration-200 hover:scale-105"
                            >
                                Sign In
                            </Button>
                            <Button
                                onClick={() => navigate('/signup')}
                                className="gap-2 rounded-full transition-all duration-200 hover:scale-105 hover:shadow-lg group"
                            >
                                Get Started
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

                <div className="container mx-auto max-w-6xl relative">
                    <div className="text-center max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm transition-all duration-300 hover:scale-105 hover:bg-primary/10 cursor-pointer">
                            <Award className="h-3.5 w-3.5" />
                            <span className="font-medium">Trusted by 500+ Companies</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight">
                            Modern HR Management
                            <span className="block text-primary mt-2">Made Simple</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            Streamline your HR operations with our all-in-one platform. Manage employees, track attendance, process payroll, and gain insights—all from one dashboard.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button
                                size="lg"
                                onClick={() => navigate('/signup')}
                                className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-full group"
                            >
                                Start Free Trial
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => navigate('/login')}
                                className="rounded-full transition-all duration-300 hover:scale-105"
                            >
                                Watch Demo
                            </Button>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                <span>14-day free trial</span>
                            </div>
                            <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                <span>Cancel anytime</span>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="mt-16 max-w-5xl mx-auto animate-in fade-in zoom-in duration-1000 delay-300">
                        <div className="relative rounded-2xl border border-border bg-card shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                            <div className="relative p-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { icon: Users, label: 'Employees', value: '156', color: 'blue' },
                                        { icon: Clock, label: 'Attendance', value: '91%', color: 'emerald' },
                                        { icon: Calendar, label: 'Leaves', value: '24', color: 'amber' },
                                        { icon: TrendingUp, label: 'Payroll', value: '$105K', color: 'purple' }
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-background/80 backdrop-blur rounded-xl p-4 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer group"
                                        >
                                            <div className={`inline-flex p-2 rounded-lg bg-${item.color}-500/10 mb-2 transition-all duration-300 group-hover:bg-${item.color}-500/20 group-hover:scale-110`}>
                                                <item.icon className={`h-5 w-5 text-${item.color}-600 dark:text-${item.color}-400`} />
                                            </div>
                                            <p className="text-2xl font-bold text-foreground">{item.value}</p>
                                            <p className="text-xs text-muted-foreground">{item.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border/40 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700 transition-transform duration-300 hover:scale-110" style={{ animationDelay: `${index * 100}ms` }}>
                                <p className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in duration-700">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            Everything You Need to Manage Your Team
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Powerful features designed to simplify HR operations and boost productivity
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 cursor-pointer"
                                style={{ animationDelay: `${index * 100}ms`, animationDuration: '600ms' }}
                            >
                                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                    <feature.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left - About Content */}
                        <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                                About Dayflow
                            </h2>
                            <div className="space-y-4 text-muted-foreground">
                                <p className="text-lg leading-relaxed">
                                    Dayflow is a modern HR management platform designed to simplify and streamline your human resources operations. We believe that managing people should be simple, efficient, and empowering.
                                </p>
                                <p className="leading-relaxed">
                                    Founded with the vision of transforming traditional HR processes, we've built a comprehensive solution that combines employee management, attendance tracking, leave management, and payroll processing into one intuitive platform.
                                </p>
                                <p className="leading-relaxed">
                                    Our mission is to help organizations focus on what matters most—their people. By automating routine tasks and providing powerful insights, we enable HR teams to make better decisions and create better workplace experiences.
                                </p>
                            </div>

                            {/* Key Points */}
                            <div className="mt-8 grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3 group">
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Easy to Use</h4>
                                        <p className="text-sm text-muted-foreground">Intuitive interface designed for everyone</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 group">
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <Shield className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Secure & Reliable</h4>
                                        <p className="text-sm text-muted-foreground">Enterprise-grade security standards</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 group">
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <Users className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">People First</h4>
                                        <p className="text-sm text-muted-foreground">Built with employees in mind</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 group">
                                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                        <TrendingUp className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground mb-1">Always Growing</h4>
                                        <p className="text-sm text-muted-foreground">Continuous improvements and updates</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right - Company Stats */}
                        <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                            <div className="glass rounded-3xl p-8 border border-border/40 shadow-xl">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 pb-6 border-b border-border/40">
                                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                            <Building2 className="h-8 w-8 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-foreground">Dayflow Technologies</p>
                                            <p className="text-sm text-muted-foreground">Empowering HR Teams Worldwide</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="text-center p-4 rounded-2xl bg-muted/50 transition-all duration-300 hover:bg-muted hover:scale-105 cursor-pointer">
                                            <p className="text-3xl font-bold text-foreground mb-1">500+</p>
                                            <p className="text-sm text-muted-foreground">Companies</p>
                                        </div>
                                        <div className="text-center p-4 rounded-2xl bg-muted/50 transition-all duration-300 hover:bg-muted hover:scale-105 cursor-pointer">
                                            <p className="text-3xl font-bold text-foreground mb-1">50K+</p>
                                            <p className="text-sm text-muted-foreground">Users</p>
                                        </div>
                                        <div className="text-center p-4 rounded-2xl bg-muted/50 transition-all duration-300 hover:bg-muted hover:scale-105 cursor-pointer">
                                            <p className="text-3xl font-bold text-foreground mb-1">99.9%</p>
                                            <p className="text-sm text-muted-foreground">Uptime</p>
                                        </div>
                                        <div className="text-center p-4 rounded-2xl bg-muted/50 transition-all duration-300 hover:bg-muted hover:scale-105 cursor-pointer">
                                            <p className="text-3xl font-bold text-foreground mb-1">24/7</p>
                                            <p className="text-sm text-muted-foreground">Support</p>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-border/40">
                                        <p className="text-sm text-muted-foreground text-center">
                                            Trusted by organizations across 50+ countries
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent">
                <div className="container mx-auto max-w-4xl text-center animate-in fade-in zoom-in duration-700">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                        Ready to Transform Your HR?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of companies using Dayflow to streamline their HR operations and focus on what matters most—their people.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            onClick={() => navigate('/signup')}
                            className="gap-2 shadow-lg rounded-full transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
                        >
                            Start Free Trial
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={() => navigate('/login')}
                            className="rounded-full transition-all duration-300 hover:scale-105"
                        >
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/40">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Features</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Pricing</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">About</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Blog</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Documentation</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Help Center</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Privacy</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Terms</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors duration-200">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer">
                            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-sm">
                                D
                            </div>
                            <span className="font-semibold text-foreground">Dayflow HRMS</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © 2026 Dayflow Technologies. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
