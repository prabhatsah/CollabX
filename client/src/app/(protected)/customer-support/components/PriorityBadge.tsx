import { AlertTriangle, Minus, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TicketPriority } from '@/types';
import { Badge } from '@/components/ui/badge';

interface PriorityBadgeProps {
  priority: TicketPriority;
  className?: string;
}

const priorityConfig = {
  LOW: {
    label: 'Low',
    color: 'bg-priority-low/10 text-priority-low border-priority-low/20',
    icon: Minus,
  },
  MEDIUM: {
    label: 'Medium',
    color:
      'bg-priority-medium/10 text-priority-medium border-priority-medium/20',
    icon: AlertTriangle,
  },
  HIGH: {
    label: 'High',
    color: 'bg-priority-high/10 text-priority-high border-priority-high/20',
    icon: ArrowUp,
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  debugger;
  const config = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 ',
        config.color,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
