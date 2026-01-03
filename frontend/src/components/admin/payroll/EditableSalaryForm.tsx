import { useState } from 'react';
import { Employee } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EditableSalaryFormProps {
  employee: Employee;
}

export function EditableSalaryForm({ employee }: EditableSalaryFormProps) {
  const [formData, setFormData] = useState({
    basic: employee.salary.basic,
    hra: employee.salary.hra,
    allowances: employee.salary.allowances,
    pfDeduction: employee.salary.pfDeduction,
    taxDeduction: employee.salary.taxDeduction,
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleSave = () => {
    toast({
      title: 'Salary Updated',
      description: `${employee.firstName} ${employee.lastName}'s salary has been updated successfully.`,
    });
  };

  const handleReset = () => {
    setFormData({
      basic: employee.salary.basic,
      hra: employee.salary.hra,
      allowances: employee.salary.allowances,
      pfDeduction: employee.salary.pfDeduction,
      taxDeduction: employee.salary.taxDeduction,
    });
  };

  const grossSalary = formData.basic + formData.hra + formData.allowances;
  const totalDeductions = formData.pfDeduction + formData.taxDeduction;
  const netSalary = grossSalary - totalDeductions;

  return (
    <div className="space-y-6">
      {/* Earnings Section */}
      <div className="rounded-xl border border-border bg-card shadow-soft p-5">
        <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wider mb-4">
          Earnings
        </h4>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="basic" className="text-sm text-muted-foreground">Basic Salary</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="basic"
                type="number"
                value={formData.basic}
                onChange={(e) => handleChange('basic', e.target.value)}
                className="pl-7"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hra" className="text-sm text-muted-foreground">HRA</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="hra"
                type="number"
                value={formData.hra}
                onChange={(e) => handleChange('hra', e.target.value)}
                className="pl-7"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="allowances" className="text-sm text-muted-foreground">Allowances</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="allowances"
                type="number"
                value={formData.allowances}
                onChange={(e) => handleChange('allowances', e.target.value)}
                className="pl-7"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Deductions Section */}
      <div className="rounded-xl border border-border bg-card shadow-soft p-5">
        <h4 className="text-sm font-semibold text-card-foreground uppercase tracking-wider mb-4">
          Deductions
        </h4>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="pf" className="text-sm text-muted-foreground">Provident Fund (PF)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="pf"
                type="number"
                value={formData.pfDeduction}
                onChange={(e) => handleChange('pfDeduction', e.target.value)}
                className="pl-7"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tax" className="text-sm text-muted-foreground">Tax Deduction</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="tax"
                type="number"
                value={formData.taxDeduction}
                onChange={(e) => handleChange('taxDeduction', e.target.value)}
                className="pl-7"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-border bg-muted/30 p-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-muted-foreground">Gross Salary</p>
            <p className="text-xl font-semibold text-success">${grossSalary.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total Deductions</p>
            <p className="text-xl font-semibold text-destructive">-${totalDeductions.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Net Salary</p>
            <p className="text-xl font-semibold text-primary">${netSalary.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={handleReset}>
          <RotateCcw size={16} className="mr-2" />
          Reset
        </Button>
        <Button onClick={handleSave}>
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
