import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompanyStatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    iconColor?: string;
    iconBgColor?: string;
}

export function CompanyStatCard({
    title,
    value,
    icon: Icon,
    iconColor = 'text-primary',
    iconBgColor = 'bg-primary/10'
}: CompanyStatCardProps) {
    return (
        <div className="glass rounded-xl p-6 hover-lift transition-all duration-300">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium mb-2">
                        {title}
                    </p>
                    <h3 className="text-3xl font-bold text-foreground tracking-tight">
                        {value}
                    </h3>
                </div>
                <div className={cn(
                    'p-3 rounded-lg transition-all duration-300',
                    iconBgColor
                )}>
                    <Icon className={cn('h-6 w-6', iconColor)} />
                </div>
            </div>
        </div>
    );
}
