import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconClockHour4,
  IconHourglassEmpty,
  IconLoader,
  IconCircleMinusFilled,
  IconCircle,
} from '@tabler/icons-react';
import { Badge } from '@/components/ui/badge';

type Status =
  | 'In Progress'
  | 'On Hold'
  | 'Closed'
  | 'Resolved'
  | 'Cancelled'
  | 'Open';

interface StatusConfig {
  icon: React.ElementType;
  color: string;
}

const statusMap: Record<Status, StatusConfig> = {
  'In Progress': {
    icon: IconLoader,
    color: 'text-blue-500 dark:text-blue-400',
  },
  'On Hold': {
    icon: IconClockHour4,
    color: 'text-yellow-500 dark:text-yellow-400',
  },
  Closed: {
    icon: IconCircleXFilled,
    color: 'text-gray-500 dark:text-gray-400',
  },
  Resolved: {
    icon: IconCircleCheckFilled,
    color: 'text-green-500 dark:text-green-400',
  },
  Cancelled: {
    icon: IconCircleMinusFilled,
    color: 'text-red-500 dark:text-red-400',
  },
  Open: {
    icon: IconCircle,
    color: 'text-purple-500 dark:text-purple-400',
  },
};

export function TicketStatusBadge({ status }: { status: Status }) {
  const { icon: Icon, color } = statusMap[status] || {
    icon: IconCircle,
    color: 'text-muted-foreground',
  };
  

  return (
    <Badge variant="outline" className="flex items-center gap-1 px-1.5">
      <Icon className={color} size={16} />
      {status}
    </Badge>
  );
}
