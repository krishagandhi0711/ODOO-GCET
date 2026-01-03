import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PolicyCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    iconColor?: string;
    iconBgColor?: string;
}

export function PolicyCard({
    icon: Icon,
    title,
    description,
    iconColor = 'text-primary',
    iconBgColor = 'bg-primary/10'
}: PolicyCardProps) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300">
            <div className={cn(
                'p-2.5 rounded-lg shrink-0',
                iconBgColor
            )}>
                <Icon className={cn('h-5 w-5', iconColor)} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                    {title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
}
