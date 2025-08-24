'use client';

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { useAuditlogs } from '@/hooks/useAuditLogs';
import { formatDate } from '@/lib/formatDate';
import { StatusDotFail, StatusDotSuccess } from '@/components/status-dot';
import NoRecordsFound from '@/components/no-records';
import { BoxSpinner } from '@/components/loading-style/box-spinner';
import ErrorPage from '@/components/error-style/error-page';
import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingContext';

export default function AuditLogPage() {
  const { auditLogs, loading, error } = useAuditlogs();
  const { setLoading } = useLoading();

  console.log('auditLogs in page:', auditLogs);

  // if (loading) return <BoxSpinner />;
  useEffect(() => {
    if (loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [loading, setLoading]);

  if (error) return <ErrorPage />;

  return (
    <div className="p-6 space-y-4 h-[100vh]">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Audit log</h1>
          <p className="text-muted-foreground">View your members activity</p>
        </div>
      </header>
      {auditLogs && auditLogs.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-b">
            {auditLogs.map((log) => (
              <TableRow className="" key={log.id}>
                <TableCell className="flex items-center gap-3">
                  {log.payload.success ? (
                    <StatusDotSuccess />
                  ) : (
                    <StatusDotFail />
                  )}
                  {log.payload.event}
                </TableCell>
                <TableCell>{log.payload.fullName ?? 'n/a'}</TableCell>
                <TableCell>{log.payload.email}</TableCell>
                <TableCell>{log.payload.message}</TableCell>
                <TableCell>{formatDate(log.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <NoRecordsFound />
      )}
    </div>
  );
}
