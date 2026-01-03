import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Wallet, Download, Calendar, TrendingUp } from "lucide-react";
import { payrollService } from "@/services/payroll.service";
import type { Payslip } from "@/types/api.types";

export default function Payroll() {
    const [currentPayslip, setCurrentPayslip] = useState<Payslip | null>(null);
    const [history, setHistory] = useState<Payslip[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPayrollData = async () => {
            try {
                const [current, historyData] = await Promise.all([
                    payrollService.getMyCurrentPayslip(),
                    payrollService.getMyPayslipHistory(6)
                ]);
                setCurrentPayslip(current);
                setHistory(historyData);
            } catch (error) {
                console.error('Failed to fetch payroll data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPayrollData();
    }, []);

    if (isLoading) {
        return (
            <AppLayout title="Payroll">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </AppLayout>
        );
    }

    if (!currentPayslip) {
        return (
            <AppLayout title="Payroll">
                <div className="text-center py-12">
                    <Wallet className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Payslip Available</h3>
                    <p className="text-muted-foreground">Your payslip for the current month is not yet available.</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout title="Payroll">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-foreground mb-1">Payslip</h2>
                        <p className="text-muted-foreground font-medium">{currentPayslip.period.display}</p>
                    </div>
                    <Button className="gap-2">
                        <Download className="h-4 w-4" />
                        Download PDF
                    </Button>
                </div>

                {/* Current Month Payslip */}
                <div className="bg-card rounded-xl border border-border p-6 shadow-soft">
                    {/* Employee Info */}
                    <div className="mb-6 pb-6 border-b border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-3">Employee Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Name</p>
                                <p className="font-medium text-foreground">{currentPayslip.employee.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Employee Code</p>
                                <p className="font-medium text-foreground">{currentPayslip.employee.code}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Department</p>
                                <p className="font-medium text-foreground">{currentPayslip.employee.department || "—"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Designation</p>
                                <p className="font-medium text-foreground">{currentPayslip.employee.designation || "—"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Earnings */}
                    <div className="mb-6 pb-6 border-b border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-3">Earnings</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-foreground">Basic Salary</span>
                                <span className="font-medium text-foreground">₹{currentPayslip.earnings.basic.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground">HRA</span>
                                <span className="font-medium text-foreground">₹{currentPayslip.earnings.hra.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground">Special Allowance</span>
                                <span className="font-medium text-foreground">₹{currentPayslip.earnings.special_allowance.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-border">
                                <span className="font-semibold text-foreground">Total Earnings</span>
                                <span className="font-bold text-primary">₹{currentPayslip.earnings.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Deductions */}
                    <div className="mb-6 pb-6 border-b border-border">
                        <h3 className="text-lg font-semibold text-foreground mb-3">Deductions</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-foreground">Provident Fund</span>
                                <span className="font-medium text-foreground">₹{currentPayslip.deductions.pf.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-foreground">Professional Tax</span>
                                <span className="font-medium text-foreground">₹{currentPayslip.deductions.professional_tax.toLocaleString()}</span>
                            </div>
                            {currentPayslip.deductions.leave_deduction > 0 && (
                                <div className="flex justify-between text-amber-600 dark:text-amber-400">
                                    <span>Leave Deduction ({currentPayslip.stats.unpaid_leave_days} days)</span>
                                    <span className="font-medium">₹{currentPayslip.deductions.leave_deduction.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between pt-2 border-t border-border">
                                <span className="font-semibold text-foreground">Total Deductions</span>
                                <span className="font-bold text-destructive">₹{currentPayslip.deductions.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Net Payable */}
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">Net Payable</p>
                                <p className="text-3xl font-bold text-primary">₹{currentPayslip.summary.net_payable.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Effective Working Days</p>
                                <p className="text-lg font-semibold text-foreground">{currentPayslip.stats.effective_working_days} / {currentPayslip.stats.total_working_days}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payslip History */}
                {history.length > 0 && (
                    <div className="bg-card rounded-xl border border-border shadow-soft overflow-hidden">
                        <div className="p-6 border-b border-border">
                            <h2 className="text-lg font-semibold text-foreground">Payslip History</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-muted/30">
                                        <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                                            Period
                                        </th>
                                        <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                                            Gross Earnings
                                        </th>
                                        <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                                            Deductions
                                        </th>
                                        <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">
                                            Net Payable
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {history.map((payslip, index) => (
                                        <tr key={index} className="hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-foreground">{payslip.period.display}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-foreground">₹{payslip.summary.gross_earning.toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-destructive">₹{payslip.summary.total_deduction.toLocaleString()}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-primary">₹{payslip.summary.net_payable.toLocaleString()}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
