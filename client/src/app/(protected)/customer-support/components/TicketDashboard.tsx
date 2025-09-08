'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  MessageSquare,
  Activity,
  AlertCircle,
  CheckCircle2,
  Circle,
  TicketCheck,
  CircleAlert,
  Ban,
  CircleCheckBig,
  Minus,
  ArrowUp,
  AlertTriangle,
  Lock,
  LockKeyhole,
  LockKeyholeOpen,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Ticket } from '@/types';
import { CommentSection } from './comment-section';
import TicketActivity from './ticket-activity';
import { BoxSpinner } from '@/components/loading-style/box-spinner';
import ErrorPage from '@/components/error-style/error-page';
import { formatDate } from '@/lib/formatDate';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useOrgUsers } from '@/hooks/useOrgUsers';
import { cn } from '@/lib/utils';

// interface Comment {
//   id: string;
//   author: string;
//   avatar: string;
//   content: string;
//   timestamp: string;
//   images?: string[];
// }

// interface ActivityItem {
//   id: string;
//   type:
//     | 'created'
//     | 'assigned'
//     | 'status_changed'
//     | 'priority_changed'
//     | 'comment';
//   author: string;
//   content: string;
//   timestamp: string;
//   details?: string;
// }

function Dashboard({
  ticket,
  onSuccess,
}: {
  ticket: Ticket;
  onSuccess: () => void;
}) {
  console.log('ticket in dashboard', ticket);

  const [status, setStatus] = useState(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);

  const [assignee, setAssignee] = useState(ticket.assigneeUserId ?? '');

  const [newComment, setNewComment] = useState('');

  const { users, getUserById, loading, error, refresh } = useOrgUsers();

  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'status' | 'priority' | 'assignee' | null;
    newValue: string;
    oldValue: string;
    label: string;
  }>({
    isOpen: false,
    type: null,
    newValue: '',
    oldValue: '',
    label: '',
  });

  const handleStatusChange = (newValue: string) => {
    setConfirmDialog({
      isOpen: true,
      type: 'status',
      newValue,
      oldValue: status,
      label: 'Status',
    });
  };

  const handlePriorityChange = (newValue: string) => {
    setConfirmDialog({
      isOpen: true,
      type: 'priority',
      newValue,
      oldValue: priority,
      label: 'Priority',
    });
  };

  const handleAssigneeChange = (newValue: string) => {
    console.log('old assignee', assignee === '');

    setConfirmDialog({
      isOpen: true,
      type: 'assignee',
      newValue,
      oldValue: assignee,
      label: 'Assignee',
    });
  };

  const handleConfirmChange = () => {
    if (confirmDialog.type === 'status') {
      setStatus(confirmDialog.newValue);
    } else if (confirmDialog.type === 'priority') {
      setPriority(confirmDialog.newValue);
    } else if (confirmDialog.type === 'assignee') {
      setAssignee(confirmDialog.newValue);

      updateAssignee(confirmDialog.newValue);
    }

    setConfirmDialog({
      isOpen: false,
      type: null,
      newValue: '',
      oldValue: '',
      label: '',
    });
  };

  const handleCancelChange = () => {
    setConfirmDialog({
      isOpen: false,
      type: null,
      newValue: '',
      oldValue: '',
      label: '',
    });
  };

  const getValueLabel = (type: string, value: string) => {
    if (type === 'status') {
      switch (value) {
        case 'OPEN':
          return 'Open';
        case 'IN_PROGRESS':
          return 'In Progress';
        case 'ON_HOLD':
          return 'On Hold';
        case 'CANCELLED':
          return 'Cancelled';
        case 'RESOLVED':
          return 'Resolved';
        case 'CLOSED':
          return 'Closed';
        default:
          return value;
      }
    } else if (type === 'priority') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else if (type === 'assignee') {
      switch (value) {
        case 'jane-smith':
          return 'Jane Smith';
        case 'john-doe':
          return 'John Doe';
        case 'admin-bob':
          return 'Admin Bob';
        default:
          return value;
      }
    }
    return value;
  };

  const updateAssignee = async (newAssigneeId: string) => {
    try {
      const res = await apiFetch('/ticket/assign', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          ticketId: ticket.id,
          assigneeUserId: newAssigneeId,
        }),
      });

      console.log('Assignee update response:', res);

      toast.success('Assignee updated', {
        description: `Ticket assigned to ${getUserById(newAssigneeId)?.fullName}`,
      });

      onSuccess?.();
    } catch (error) {
      toast.error('User assign failed', {
        description: error?.message || 'Something went wrong',
      });
    }
  };

  if (loading) return <BoxSpinner />;
  if (error) return <ErrorPage />;

  // const comments: Comment[] = [
  //   {
  //     id: '1',
  //     author: 'Sarah Johnson',
  //     avatar: '/diverse-woman-portrait.png',
  //     content:
  //       'This is such an amazing project! The attention to detail in the UI design is incredible.',
  //     timestamp: '2h ago',
  //   },
  //   {
  //     id: '2',
  //     author: 'Michael Chen',
  //     avatar: '/thoughtful-man.png',
  //     content: 'Great work on the implementation! Here are some screenshots:',
  //     timestamp: '4h ago',
  //     images: ['/mobile-app-screenshot.png', '/code-editor-screenshot.jpg'],
  //   },
  //   {
  //     id: '3',
  //     author: 'Emily Rodriguez',
  //     avatar: '/woman-developer.png',
  //     content:
  //       'The dark theme looks fantastic! Could you share more details about the color palette?',
  //     timestamp: '6h ago',
  //   },
  // ];

  // const activities: ActivityItem[] = [
  //   {
  //     id: '1',
  //     type: 'created',
  //     author: 'John Doe',
  //     content: 'Ticket created',
  //     timestamp: '01 Sept 2025, 17:44',
  //   },
  //   {
  //     id: '2',
  //     type: 'assigned',
  //     author: 'Admin Bob',
  //     content: 'Assigned to Jane Smith',
  //     timestamp: '02 Sept 2025, 17:44',
  //   },
  //   {
  //     id: '3',
  //     type: 'status_changed',
  //     author: 'Jane Smith',
  //     content: 'Status changed from Open to In Progress',
  //     timestamp: '03 Sept 2025, 17:44',
  //   },
  //   {
  //     id: '4',
  //     type: 'priority_changed',
  //     author: 'Jane Smith',
  //     content: 'Priority changed from Medium to High',
  //     timestamp: '04 Sept 2025, 17:44',
  //   },
  //   {
  //     id: '5',
  //     type: 'comment',
  //     author: 'John Doe',
  //     content: 'Comment added',
  //     timestamp: '05 Sept 2025, 17:44',
  //     details:
  //       "I've added more context about the steps to reproduce the bug. It seems to occur after clicking the 'Save' button twice in quick succession.\n\nEnvironment: macOS 14.5, Chrome 127.",
  //   },
  // ];

  return (
    <div className="bg-background p-4 w-full min-h-screen">
      <div className=" ">
        {/* Header */}
        <div className="mb-4">
          <p className="text-xl font-bold text-foreground mb-2 flex items-center gap-3">
            <TicketCheck className="-rotate-25" />
            {ticket.ticketNo}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 ">
          {/* Left Panel - Ticket Details */}
          <div className="col-span-1 ">
            <Card className="bg-card border-border h-[91vh]">
              <CardHeader className="pb-4 flex items-center justify-between">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-semibold text-card-foreground text-balance">
                      {ticket.title}
                    </h2>
                  </div>
                </div>
                <div
                  className={cn(
                    `border p-2 rounded-md cursor-pointer ${ticket.locked ? 'border-destructive text-destructive' : 'border-success text-success'}`,
                  )}
                >
                  {ticket.locked ? (
                    <LockKeyhole size={16} />
                  ) : (
                    <LockKeyholeOpen size={16} />
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Creator Info */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Created By
                  </Label>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/abstract-geometric-shapes.png" />
                      <AvatarFallback>AB</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-card-foreground">
                        {getUserById(ticket.createdByUserId)?.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {getUserById(ticket.createdByUserId)?.email}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Details Section */}
                <div className="space-y-4">
                  <h3 className="font-medium text-card-foreground">Details</h3>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between ">
                      <Label className="text-sm text-muted-foreground">
                        Status
                      </Label>
                      <Select value={status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="mt-1">
                          <div className="flex items-center gap-2 ">
                            <SelectValue />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="OPEN">
                            <div className="flex items-center gap-2">
                              <Circle className="h-4 w-4 text-red-400" />
                              Open
                            </div>
                          </SelectItem>
                          <SelectItem value="IN_PROGRESS">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-blue-500" />
                              In Progress
                            </div>
                          </SelectItem>
                          <SelectItem value="ON_HOLD">
                            <div className="flex items-center gap-2">
                              <CircleAlert className="h-4 w-4 text-yellow-500" />
                              On Hold
                            </div>
                          </SelectItem>
                          <SelectItem value="CANCELLED">
                            <div className="flex items-center gap-2">
                              <Ban className="h-4 w-4 text-red-500" />
                              Cancelled
                            </div>
                          </SelectItem>
                          <SelectItem value="resolved">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                              Resolved
                            </div>
                          </SelectItem>
                          <SelectItem value="CLOSED">
                            <div className="flex items-center gap-2">
                              <CircleCheckBig className="h-4 w-4 text-green-500" />
                              Closed
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-between">
                      <Label className="text-sm text-muted-foreground">
                        Priority
                      </Label>
                      <Select
                        value={priority}
                        onValueChange={handlePriorityChange}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW">
                            <div className="flex items-center gap-2">
                              <Minus className="h-4 w-4 text-priority-low" />
                              Low
                            </div>
                          </SelectItem>
                          <SelectItem value="MEDIUM">
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-priority-medium" />
                              Medium
                            </div>
                          </SelectItem>
                          <SelectItem value="HIGH">
                            <div className="flex items-center gap-2">
                              <ArrowUp className="h-4 w-4 text-priority-high" />
                              High
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-between">
                      <Label className="text-sm text-muted-foreground">
                        Assignee
                      </Label>
                      <Select
                        value={assignee}
                        onValueChange={handleAssigneeChange}
                      >
                        <SelectTrigger className="mt-1 py-5">
                          <SelectValue placeholder="Select Assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.userId} value={user.userId}>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src="/abstract-geometric-shapes.png" />
                                  <AvatarFallback>AB</AvatarFallback>
                                </Avatar>
                              </div>
                              <div>{user.fullName}</div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created On:</span>
                      <span className="text-card-foreground">
                        {formatDate(ticket.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Last Updated On:
                      </span>
                      <span className="text-card-foreground">
                        {formatDate(ticket.updatedOn ?? ticket.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Last Updated By:
                      </span>
                      <span className="text-card-foreground">Alisha Barik</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-muted-foreground">
                    Description
                  </Label>
                  <div className="text-sm text-card-foreground leading-relaxed text-pretty">
                    Ticket in microsoft by Tikki Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit. Quod, alias! Eveniet, iusto
                    eum dolore, veritatis magnam ipsam praesentium molestias
                    ipsa sapiente quod autem velit consequuntur doloribus vero
                    nulla exercitationem ab. Lorem ipsum dolor, sit amet
                    consectetur adipisicing elit.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Panel - Activity Feed */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border h-[91vh]">
              <CardHeader>
                <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity
                </h3>
              </CardHeader>
              <CardContent>
                {/* <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={activity.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        {getActivityIcon(activity.type)}
                        {index < activities.length - 1 && (
                          <div className="w-px h-8 bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pb-4">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm text-card-foreground">
                            <span className="font-medium">
                              {activity.content}
                            </span>
                            {activity.author && (
                              <span className="text-muted-foreground">
                                {' '}
                                by {activity.author}
                              </span>
                            )}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.timestamp}
                        </p>
                        {activity.details && (
                          <div className="mt-2 p-3 bg-muted/50 rounded-md border border-border">
                            <p className="text-sm text-card-foreground whitespace-pre-line">
                              {activity.details}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div> */}
                <TicketActivity />
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Comments */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border h-[91vh] gap-2">
              <CardHeader>
                <h3 className="text-lg font-semibold text-card-foreground flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comments
                </h3>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                {/* <div className="space-y-4 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarImage
                          src={comment.avatar || '/placeholder.svg'}
                        />
                        <AvatarFallback>
                          {comment.author
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-sm text-card-foreground">
                            {comment.author}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {comment.timestamp}
                          </p>
                        </div>
                        <p className="text-sm text-card-foreground leading-relaxed mb-2">
                          {comment.content}
                        </p>
                        {comment.images && (
                          <div className="flex gap-2 mt-2">
                            {comment.images.map((image, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={image || '/placeholder.svg'}
                                  alt={`Screenshot ${index + 1}`}
                                  className="w-20 h-16 object-cover rounded border border-border hover:opacity-80 transition-opacity cursor-pointer"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="/current-user.jpg" />
                      <AvatarFallback>YU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[80px] resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" className="gap-2">
                      <Send className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div> */}
                <CommentSection />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <Dialog
          open={confirmDialog.isOpen}
          onOpenChange={(open) => !open && handleCancelChange()}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Change</DialogTitle>
              <DialogDescription>
                {confirmDialog.type == 'assignee' ? (
                  confirmDialog.oldValue === '' ? (
                    <div className="space-y-1">
                      <p>Are you sure want to assign the following user:</p>
                      <p>
                        <span className="">Name:</span>{' '}
                        <span className="font-bold">
                          {getUserById(confirmDialog.newValue)?.fullName}
                        </span>
                      </p>
                      <p>
                        <span className="">Email:</span>{' '}
                        <span className="font-bold">
                          {getUserById(confirmDialog.newValue)?.email}
                        </span>
                      </p>
                      <p>
                        <span className="">Role:</span>{' '}
                        <span className="font-bold">
                          {getUserById(confirmDialog.newValue)?.role}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p>Are you sure want to update the assign ?</p>
                      <div>
                        <p>Previous assign:</p>
                        <p>
                          <span className="">Name:</span>{' '}
                          <span className="font-bold">
                            {getUserById(confirmDialog.oldValue)?.fullName}
                          </span>
                        </p>
                        <p>
                          <span className="">Email:</span>{' '}
                          <span className="font-bold">
                            {getUserById(confirmDialog.oldValue)?.email}
                          </span>
                        </p>
                        <p>
                          <span className="">Role:</span>{' '}
                          <span className="font-bold">
                            {getUserById(confirmDialog.oldValue)?.role}
                          </span>
                        </p>
                      </div>

                      <div>
                        <p>New assign:</p>
                        <p>
                          <span className="">Name:</span>{' '}
                          <span className="font-bold">
                            {getUserById(confirmDialog.newValue)?.fullName}
                          </span>
                        </p>
                        <p>
                          <span className="">Email:</span>{' '}
                          <span className="font-bold">
                            {getUserById(confirmDialog.newValue)?.email}
                          </span>
                        </p>
                        <p>
                          <span className="">Role:</span>{' '}
                          <span className="font-bold">
                            {getUserById(confirmDialog.newValue)?.role}
                          </span>
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  `Change the
                ${confirmDialog.label.toLowerCase()} from
                ${getValueLabel(
                  confirmDialog.type || '',
                  confirmDialog.oldValue,
                )}
                to ${getValueLabel(
                  confirmDialog.type || '',
                  confirmDialog.newValue,
                )}
                ?`
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <Button variant="outline" onClick={handleCancelChange}>
                Cancel
              </Button>
              <Button onClick={handleConfirmChange}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default function TicketDashboard({
  ticket,
  onSuccess,
}: {
  ticket: Ticket;
  onSuccess: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <span className="cursor-pointer ">{ticket.ticketNo}</span>
        </DialogTrigger>
        <DialogContent
          className="!w-screen !h-screen !max-w-none !max-h-none p-0 m-0 rounded-none border-0"
          style={{
            width: '100vw !important',
            height: '100vh !important',
            maxWidth: 'none !important',
            maxHeight: 'none !important',
          }}
        >
          <div className="h-full w-full overflow-auto">
            <Dashboard ticket={ticket} onSuccess={onSuccess} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
