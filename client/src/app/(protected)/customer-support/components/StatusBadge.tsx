import { Badge } from '@/components/ui/badge';

import {
  Circle,
  Clock,
  Play,
  Pause,
  X,
  CheckCircle,
  Archive,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TicketStatus } from '@/types';

interface StatusBadgeProps {
  status: TicketStatus;
  className?: string;
}

const statusConfig = {
  OPEN: {
    label: 'Open',
    color: 'bg-status-open/10 text-status-open border-status-open/20',
    icon: Circle,
  },
  ASSIGNED: {
    label: 'Assigned',
    color:
      'bg-status-assigned/10 text-status-assigned border-status-assigned/20',
    icon: Clock,
  },
  IN_PROGRESS: {
    label: 'In Progress',
    color:
      'bg-status-in-progress/10 text-status-in-progress border-status-in-progress/20',
    icon: Play,
  },
  ON_HOLD: {
    label: 'On Hold',
    color: 'bg-status-on-hold/10 text-status-on-hold border-status-on-hold/20',
    icon: Pause,
  },
  CANCELLED: {
    label: 'Cancelled',
    color: 'bg-status-closed/10 text-status-closed border-status-closed/20',
    icon: X,
  },
  RESOLVED: {
    label: 'Resolved',
    color:
      'bg-status-resolved/10 text-status-resolved border-status-resolved/20',
    icon: CheckCircle,
  },
  CLOSED: {
    label: 'Closed',
    color: 'bg-status-closed/10 text-status-closed border-status-closed/20',
    icon: Archive,
  },
};

export function StatusBadge({ status, className}: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1',
        config.color,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
}
