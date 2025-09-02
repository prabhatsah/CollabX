"use client"

import { type FC, type ReactNode, useMemo } from "react"
import { cn } from "@/lib/utils"
import { PlusCircle, UserCheck, ArrowRightLeft, Flag, MessageSquareText } from "lucide-react"

export type TicketActivityItem =
  | {
      id: string
      type: "created"
      actor: string
      timestamp: string // ISO string
      meta?: { createdBy?: string }
    }
  | {
      id: string
      type: "assigned"
      actor: string // actor performing the assignment (e.g., Admin Bob)
      timestamp: string
      meta: { assignee: string } // e.g., Jane Smith
    }
  | {
      id: string
      type: "status_changed"
      actor: string
      timestamp: string
      meta: { from: string; to: string }
    }
  | {
      id: string
      type: "priority_changed"
      actor: string
      timestamp: string
      meta: { from: string; to: string }
    }
  | {
      id: string
      type: "comment_added"
      actor: string
      timestamp: string
      meta: { body: string }
    }

export type TicketActivityTimelineProps = {
  items: TicketActivityItem[]
  className?: string
}

const iconByType: Record<TicketActivityItem["type"], ReactNode> = {
  created: <PlusCircle className="h-4 w-4 text-blue-400" aria-hidden="true" />,
  assigned: <UserCheck className="h-4 w-4 text-blue-400" aria-hidden="true" />,
  status_changed: <ArrowRightLeft className="h-4 w-4 text-blue-400" aria-hidden="true" />,
  // Distinct accent for priority
  priority_changed: <Flag className="h-4 w-4 text-amber-400" aria-hidden="true" />,
  comment_added: <MessageSquareText className="h-4 w-4 text-blue-400" aria-hidden="true" />,
}

function formatTime(iso: string) {
  try {
    const d = new Date(iso)
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  } catch {
    return iso
  }
}

function Description({ item }: { item: TicketActivityItem }) {
  switch (item.type) {
    case "created": {
      const createdBy = item.meta?.createdBy ?? item.actor
      return (
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="text-foreground">Ticket created</span> <span className="text-muted-foreground">by</span>{" "}
          <span className="text-foreground font-medium">{createdBy}</span>
        </p>
      )
    }
    case "assigned": {
      const { assignee } = item.meta
      return (
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="text-foreground">Assigned</span> <span className="text-muted-foreground">to</span>{" "}
          <span className="text-foreground font-medium">{assignee}</span>{" "}
          <span className="text-muted-foreground">by</span>{" "}
          <span className="text-foreground font-medium">{item.actor}</span>
        </p>
      )
    }
    case "status_changed": {
      const { from, to } = item.meta
      return (
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="text-foreground">Status changed</span> <span className="text-muted-foreground">from</span>{" "}
          <span className="text-foreground font-medium">{from}</span> <span className="text-muted-foreground">to</span>{" "}
          <span className="text-foreground font-medium">{to}</span> <span className="text-muted-foreground">by</span>{" "}
          <span className="text-foreground font-medium">{item.actor}</span>
        </p>
      )
    }
    case "priority_changed": {
      const { from, to } = item.meta
      return (
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="text-foreground">Priority changed</span> <span className="text-muted-foreground">from</span>{" "}
          <span className="text-foreground font-medium">{from}</span> <span className="text-muted-foreground">to</span>{" "}
          <span className="text-foreground font-medium">{to}</span> <span className="text-muted-foreground">by</span>{" "}
          <span className="text-foreground font-medium">{item.actor}</span>
        </p>
      )
    }
    case "comment_added": {
      const { body } = item.meta
      return (
        <div className="space-y-2">
          <p className="text-sm leading-6 text-muted-foreground">
            <span className="text-foreground">Comment added</span> <span className="text-muted-foreground">by</span>{" "}
            <span className="text-foreground font-medium">{item.actor}</span>
          </p>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{body}</p>
          </div>
        </div>
      )
    }
  }
}

export const TicketActivityTimeline: FC<TicketActivityTimelineProps> = ({ items, className }) => {
  const sorted = useMemo(
    () => [...items].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
    [items],
  )

  return (
    <section aria-label="Ticket activity timeline" className={cn("w-full", className)}>
      <ol className="relative ml-3 border-l border-border">
        {sorted.map((item, idx) => {
          const isLast = idx === sorted.length - 1
          return (
            <li key={item.id} className={cn("pb-8 pl-6", isLast && "pb-0")}>
              {/* Icon marker */}
              <span
                className="absolute -left-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-background"
                aria-hidden="true"
              >
                {iconByType[item.type]}
              </span>

              <div className="flex flex-col gap-2">
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
          )
        })}
      </ol>
    </section>
  )
}

export default TicketActivityTimeline
