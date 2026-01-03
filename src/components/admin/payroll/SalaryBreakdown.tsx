import { Employee } from '@/data/mockData';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SalaryBreakdownProps {
  employee: Employee;
}

export function SalaryBreakdown({ employee }: SalaryBreakdownProps) {
  const { salary } = employee;
  const grossSalary = salary.basic + salary.hra + salary.allowances;
  const totalDeductions = salary.pfDeduction + salary.taxDeduction;
  const netSalary = grossSalary - totalDeductions;

  const earnings = [
    { label: 'Basic Salary', amount: salary.basic },
    { label: 'House Rent Allowance (HRA)', amount: salary.hra },
    { label: 'Other Allowances', amount: salary.allowances },
  ];

  const deductions = [
    { label: 'Provident Fund (PF)', amount: salary.pfDeduction },
    { label: 'Tax Deduction', amount: salary.taxDeduction },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Earnings */}
      <div className="rounded-xl border border-border bg-card shadow-soft">
        <div className="border-b border-border p-4 flex items-center gap-2">
          <div className="rounded-lg p-1.5 bg-success/10">
            <ArrowUp size={18} className="text-success" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-card-foreground">Earnings</h3>
            <p className="text-xs text-muted-foreground">Monthly income components</p>
          </div>
        </div>
        <div className="divide-y divide-border">
          {earnings.map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium text-card-foreground">
                ${item.amount.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-muted/30">
            <span className="text-sm font-semibold text-card-foreground">Gross Salary</span>
            <span className="text-base font-semibold text-success">
              ${grossSalary.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Deductions */}
      <div className="rounded-xl border border-border bg-card shadow-soft">
        <div className="border-b border-border p-4 flex items-center gap-2">
          <div className="rounded-lg p-1.5 bg-destructive/10">
            <ArrowDown size={18} className="text-destructive" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-card-foreground">Deductions</h3>
            <p className="text-xs text-muted-foreground">Monthly deductions</p>
          </div>
        </div>
        <div className="divide-y divide-border">
          {deductions.map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-medium text-destructive">
                -${item.amount.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between p-4 bg-muted/30">
            <span className="text-sm font-semibold text-card-foreground">Total Deductions</span>
            <span className="text-base font-semibold text-destructive">
              -${totalDeductions.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Net Salary Card */}
      <div className="lg:col-span-2 rounded-xl border border-primary/30 bg-accent/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Net Monthly Salary</p>
            <p className="text-3xl font-bold text-primary mt-1">
              ${netSalary.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Annual (Estimated)</p>
            <p className="text-xl font-semibold text-card-foreground">
              ${(netSalary * 12).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
