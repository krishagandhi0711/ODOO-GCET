interface DepartmentProgressProps {
    name: string;
    employeeCount: number;
    totalEmployees: number;
    color: string;
}

export function DepartmentProgress({
    name,
    employeeCount,
    totalEmployees,
    color
}: DepartmentProgressProps) {
    const percentage = Math.round((employeeCount / totalEmployees) * 100);

    return (
        <div className="space-y-2 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{name}</span>
                <span className="text-sm text-muted-foreground">
                    {employeeCount} {employeeCount === 1 ? 'person' : 'people'}
                </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: color
                    }}
                />
            </div>
        </div>
    );
}
