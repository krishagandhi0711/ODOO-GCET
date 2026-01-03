import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { CompanyStatCard } from '@/components/admin/company/CompanyStatCard';
import { DepartmentProgress } from '@/components/admin/company/DepartmentProgress';
import { PolicyCard } from '@/components/admin/company/PolicyCard';
import { Input } from '@/components/ui/input';
import {
    Users,
    Building2,
    MapPin,
    TrendingUp,
    Clock,
    Calendar,
    FileText,
    Search
} from 'lucide-react';
import {
    companyInfo,
    departmentStats,
    locations,
    companyPolicies,
    attendanceRate
} from '@/data/mockData';

export default function AdminCompany() {
    const [searchQuery, setSearchQuery] = useState('');
    const totalLocations = locations.length;
    const totalDepartments = departmentStats.length;

    // Filter departments based on search
    const filteredDepartments = useMemo(() => {
        if (!searchQuery) return departmentStats;
        return departmentStats.filter(dept =>
            dept.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    // Filter locations based on search
    const filteredLocations = useMemo(() => {
        if (!searchQuery) return locations;
        return locations.filter(location =>
            location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            location.country.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    return (
        <AppLayout title="Company">
            <div className="space-y-8">
                {/* Page Header with Animation */}
                <div className="border-b border-border/40 pb-6 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-accent animate-in zoom-in duration-500 delay-100">
                                <Building2 className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-foreground tracking-tight animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                                    {companyInfo.name}
                                </h1>
                                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground animate-in fade-in duration-700 delay-300">
                                    <span className="flex items-center gap-1.5">
                                        <Building2 className="h-4 w-4" />
                                        {companyInfo.industry}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="h-4 w-4" />
                                        {companyInfo.location}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Users className="h-4 w-4" />
                                        {companyInfo.totalEmployees} employees
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full sm:w-80 animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search departments or locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 glass border-border/50 focus:border-primary/50 transition-all duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Stats Grid with Staggered Animation */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                        <CompanyStatCard
                            title="Total Employees"
                            value={companyInfo.totalEmployees}
                            icon={Users}
                            iconColor="text-blue-600 dark:text-blue-400"
                            iconBgColor="bg-blue-500/10"
                        />
                    </div>
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        <CompanyStatCard
                            title="Departments"
                            value={totalDepartments}
                            icon={Building2}
                            iconColor="text-purple-600 dark:text-purple-400"
                            iconBgColor="bg-purple-500/10"
                        />
                    </div>
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        <CompanyStatCard
                            title="Locations"
                            value={totalLocations}
                            icon={MapPin}
                            iconColor="text-emerald-600 dark:text-emerald-400"
                            iconBgColor="bg-emerald-500/10"
                        />
                    </div>
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                        <CompanyStatCard
                            title="Attendance Rate"
                            value={`${attendanceRate}%`}
                            icon={TrendingUp}
                            iconColor="text-amber-600 dark:text-amber-400"
                            iconBgColor="bg-amber-500/10"
                        />
                    </div>
                </div>

                {/* Main Content Grid with Animation */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Departments Section */}
                    <div className="glass rounded-xl p-6 animate-in fade-in slide-in-from-left-4 duration-700 delay-500">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <Building2 className="h-5 w-5 text-primary" />
                                </div>
                                <h2 className="text-xl font-semibold text-foreground">
                                    Departments
                                </h2>
                            </div>
                            {searchQuery && (
                                <span className="text-sm text-muted-foreground animate-in fade-in duration-300">
                                    {filteredDepartments.length} of {departmentStats.length}
                                </span>
                            )}
                        </div>
                        <div className="space-y-4">
                            {filteredDepartments.length > 0 ? (
                                filteredDepartments.map((dept, index) => (
                                    <div
                                        key={dept.name}
                                        className="animate-in fade-in slide-in-from-left-2 duration-500"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <DepartmentProgress
                                            name={dept.name}
                                            employeeCount={dept.employeeCount}
                                            totalEmployees={companyInfo.totalEmployees}
                                            color={dept.color}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground animate-in fade-in duration-300">
                                    <Building2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>No departments found matching "{searchQuery}"</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Company Policies Section */}
                    <div className="glass rounded-xl p-6 animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-primary/10">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <h2 className="text-xl font-semibold text-foreground">
                                Company Policies
                            </h2>
                        </div>
                        <div className="space-y-4">
                            <div className="animate-in fade-in slide-in-from-right-2 duration-500 delay-100">
                                <PolicyCard
                                    icon={Clock}
                                    title="Working Hours"
                                    description={companyPolicies.workingHours.description}
                                    iconColor="text-blue-600 dark:text-blue-400"
                                    iconBgColor="bg-blue-500/10"
                                />
                            </div>
                            <div className="animate-in fade-in slide-in-from-right-2 duration-500 delay-200">
                                <PolicyCard
                                    icon={Calendar}
                                    title="Leave Policy"
                                    description={companyPolicies.leavePolicy.description}
                                    iconColor="text-emerald-600 dark:text-emerald-400"
                                    iconBgColor="bg-emerald-500/10"
                                />
                            </div>
                        </div>

                        {/* Locations List */}
                        <div className="mt-6 pt-6 border-t border-border/40 animate-in fade-in duration-700 delay-600">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-primary" />
                                    Office Locations
                                </h3>
                                {searchQuery && (
                                    <span className="text-sm text-muted-foreground animate-in fade-in duration-300">
                                        {filteredLocations.length} of {locations.length}
                                    </span>
                                )}
                            </div>
                            <div className="space-y-3">
                                {filteredLocations.length > 0 ? (
                                    filteredLocations.map((location, index) => (
                                        <div
                                            key={location.id}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-in fade-in slide-in-from-right-2"
                                            style={{ animationDelay: `${index * 50 + 100}ms` }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4 text-primary" />
                                                <p className="text-sm font-medium text-foreground">
                                                    {location.city}, {location.country}
                                                </p>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-medium px-2 py-1 rounded-md bg-primary/10">
                                                {location.employeeCount} employees
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-muted-foreground animate-in fade-in duration-300">
                                        <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                        <p>No locations found matching "{searchQuery}"</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
