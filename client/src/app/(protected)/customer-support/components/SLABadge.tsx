import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SLAStatus } from '@/types';

interface SLABadgeProps {
  status: SLAStatus;
  className?: string;
}

const slaConfig = {
  ON_TRACK: {
    label: 'On Track',
    color: 'bg-sla-on-track/10 text-sla-on-track border-sla-on-track/20',
    icon: CheckCircle,
  },
  AT_RISK: {
    label: 'At Risk',
    color: 'bg-sla-at-risk/10 text-sla-at-risk border-sla-at-risk/20',
    icon: AlertTriangle,
  },
  BREACHED: {
    label: 'Breached',
    color: 'bg-sla-breached/10 text-sla-breached border-sla-breached/20',
    icon: XCircle,
  },
};

export function SLABadge({ status, className }: SLABadgeProps) {
  const config = slaConfig[status];
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
