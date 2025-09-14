import { LockKeyhole, LockKeyholeOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LockBadgeProps {
  lock: boolean;
  className?: string;
}

const lockConfig = {
  locked: {
    color: 'bg-status-open/10 text-status-open border-status-open/20',
    icon: LockKeyhole,
  },
  unlocked: {
    color: 'bg-status-closed/10 text-status-closed border-status-closed/20',
    icon: LockKeyholeOpen,
  },
};

export function LockBadge({ lock }: LockBadgeProps) {
  return (
    <div
      className={cn(
        `border p-2 rounded-md w-fit ${lock ? lockConfig.locked.color : lockConfig.unlocked.color}`,
      )}
      title={lock ? 'Locked' : 'Unlocked'}
    >
      {lock ? (
        <lockConfig.locked.icon size={16} />
      ) : (
        <lockConfig.unlocked.icon size={16} />
      )}
    </div>
  );
}
