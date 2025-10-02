'use client';

import { type FC, type ReactNode, useMemo } from 'react';
import { cn } from '@/lib/utils';
import {
  PlusCircle,
  UserCheck,
  ArrowRightLeft,
  Flag,
  MessageSquare,
  LockKeyholeOpen,
} from 'lucide-react';
import { useUsers } from '@/hooks/useUsers';

export type TicketActivityItem =
  | {
      id: string;
      type: 'created';
      actor: string;
      timestamp: string;
      meta?: { createdBy: string };
    }
  | {
      id: string;
      type: 'locked';
      actor: string;
      timestamp: string;
      meta?: { locked: { locked: boolean } };
    }
  | {
      id: string;
      type: 'assigned';
      actor: string; // actor performing the assignment (e.g., Admin Bob)
      timestamp: string;
      meta: { assigned: { assignee: string } };
    }
  | {
      id: string;
      type: 'statusChanged';
      actor: string;
      timestamp: string;
      meta: { statusChanged: { from: string; to: string } };
    }
  | {
      id: string;
      type: 'priorityChanged';
      actor: string;
      timestamp: string;
      meta: { priorityChanged: { from: string; to: string } };
    }
  | {
      id: string;
      type: 'commentAdded';
      actor: string;
      timestamp: string;
      meta: { commentAdded: { body: string } };
    };

export type TicketActivityTimelineProps = {
  items: TicketActivityItem[];
  className?: string;
};

const iconByType: Record<TicketActivityItem['type'], ReactNode> = {
  created: <PlusCircle className="h-4 w-4 text-blue-500" aria-hidden="true" />,
  assigned: <UserCheck className="h-4 w-4 text-cyan-500" aria-hidden="true" />,
  locked: (
    <LockKeyholeOpen className="h-4 w-4 text-green-500" aria-hidden="true" />
  ),
  statusChanged: (
    <ArrowRightLeft className="h-4 w-4 text-orange-500" aria-hidden="true" />
  ),
  // Distinct accent for priority
  priorityChanged: (
    <Flag className="h-4 w-4 text-amber-400" aria-hidden="true" />
  ),
  commentAdded: (
    <MessageSquare className="h-4 w-4 text-green-500" aria-hidden="true" />
  ),
};

function formatTime(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function Description({ item }: { item: TicketActivityItem }) {
  const { getUserById } = useUsers();
  console.log('Ticket activity item:', item);

  switch (item.type) {
    case 'created': {
      const createdBy = getUserById(
        item.meta?.createdBy ?? item.actor,
      )?.fullName;

      return (
        <p className="text-sm leading-1 text-muted-foreground">
          <span className="text-foreground">Ticket created</span>{' '}
          <span className="text-muted-foreground">by</span>{' '}
          <span className="text-foreground font-medium">{createdBy}</span>
        </p>
      );
    }
    case 'assigned': {
      const { assignee } = item.meta;

      const userName = getUserById(item.meta.assigned.assignee)?.fullName;
      const actor = getUserById(item.actor)?.fullName;
      return (
        <p className="text-sm leading-1 text-muted-foreground">
          <span className="text-foreground">Assigned</span>{' '}
          <span className="text-muted-foreground">to</span>{' '}
          <span className="text-foreground font-medium">{userName}</span>{' '}
          <span className="text-muted-foreground">by</span>{' '}
          <span className="text-foreground font-medium">{actor}</span>
        </p>
      );
    }
    case 'locked': {
      const { assignee } = item.meta;

      const locked = item.meta.locked.locked;
      const actor = getUserById(item.actor)?.fullName;
      return (
        <p className="text-sm leading-1 text-muted-foreground">
          <span className="text-foreground font-medium">
            {locked ? 'Lock acquired' : 'Lock released'}
          </span>{' '}
          <span className="text-muted-foreground">by</span>{' '}
          <span className="text-foreground font-medium">{actor}</span>
        </p>
      );
    }
    case 'statusChanged': {
      const { from, to } = item.meta.statusChanged;
      return (
        <p className="text-sm leading-1 text-muted-foreground">
          <span className="text-foreground">Status changed</span>{' '}
          <span className="text-muted-foreground">from</span>{' '}
          <span className="text-foreground font-medium">{from}</span>{' '}
          <span className="text-muted-foreground">to</span>{' '}
          <span className="text-foreground font-medium">{to}</span>{' '}
          <span className="text-muted-foreground">by</span>{' '}
          <span className="text-foreground font-medium">
            {getUserById(item.actor).fullName}
          </span>
        </p>
      );
    }
    case 'priorityChanged': {
      const { from, to } = item.meta.priorityChanged;
      return (
        <p className="text-sm leading-1 text-muted-foreground">
          <span className="text-foreground">Priority changed</span>{' '}
          <span className="text-muted-foreground">from</span>{' '}
          <span className="text-foreground font-medium">{from}</span>{' '}
          <span className="text-muted-foreground">to</span>{' '}
          <span className="text-foreground font-medium">{to}</span>{' '}
          <span className="text-muted-foreground">by</span>{' '}
          <span className="text-foreground font-medium">
            {getUserById(item.actor).fullName}
          </span>
        </p>
      );
    }
    case 'commentAdded': {
      const { body } = item.meta.commentAdded;
      return (
        <div className="space-y-2">
          <p className="text-sm leading-1 text-muted-foreground">
            <span className="text-foreground">Comment added</span>{' '}
            <span className="text-muted-foreground">by</span>{' '}
            <span className="text-foreground font-medium">{item.actor}</span>
          </p>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {body}
            </p>
          </div>
        </div>
      );
    }
  }
}

export const TicketActivityTimeline: FC<TicketActivityTimelineProps> = ({
  items,
  className,
}) => {
  const sorted = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      ),
    [items],
  );

  return (
    <section
      aria-label="Ticket activity timeline"
      className={cn('w-full max-h-[75vh] overflow-y-auto', className)}
    >
      <ol className="relative ml-3 ">
        {sorted.map((item, idx) => {
          const isLast = idx === sorted.length - 1;
          return (
            <li
              key={item.id}
              className={cn(
                ' pb-5 pl-6',
                !isLast && ' border-l border-border',
                isLast && 'pb-0 ',
              )}
            >
              {/* Icon marker */}
              <span
                className={cn(
                  'absolute -left-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-card py-5',
                )}
                aria-hidden="true"
              >
                {iconByType[item.type]}
              </span>

              <div className="flex flex-col gap-2 pt-2">
                <Description item={item} />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <time
                    dateTime={item.timestamp}
                    className="font-medium"
                    aria-label={`Timestamp ${formatTime(item.timestamp)}`}
                  >
                    {formatTime(item.timestamp)}
                  </time>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default TicketActivityTimeline;
