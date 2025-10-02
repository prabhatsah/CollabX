'use client';

import * as React from 'react';
import { IconChevronDown, IconLayoutColumns } from '@tabler/icons-react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/formatDate';
import { CreateTicketForm } from './create-ticket';
import { Ticket } from '@/types';
import { PriorityBadge } from '../../components/PriorityBadge';
import { StatusBadge } from '../../components/StatusBadge';
import TicketDashboard from '../../components/TicketDashboard.tsx.discarded';
//import {  } from '@/hooks/';
import { useUsers } from '@/hooks/useUsers';
import { LockBadge } from '../../components/LockBadge';
import Link from 'next/link';

function NormalRow({ row }: { row: Row<Ticket> }) {
  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      className="relative z-0"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function OpenTicketTable({
  tickets,
  onRefresh,
}: {
  tickets: Ticket[];
  onRefresh?: () => void;
}) {
  const { loading: usersLoading, getUserById } = useUsers();
  const [data, setData] = React.useState<Ticket[]>(() => tickets ?? []);
  const [openTicket, setOpenTicket] = React.useState<Ticket | null>(null);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // helper to update a single ticket without reloading the whole table
  const updateTicketInTable = (updatedTicket: Ticket) => {
    setData((prev) =>
      prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t)),
    );
    setOpenTicket((prev) =>
      prev?.id === updatedTicket.id ? updatedTicket : prev,
    );
  };

  const columns: ColumnDef<Ticket>[] = [
    {
      accessorKey: 'ticketNo',
      header: 'Ticket',
      cell: ({ row }) => (
        // <TicketDashboard ticket={row.original} onSuccess={onRefresh} />
        //<TicketDashboard ticket={row.original} onUpdate={updateTicketInTable} />
        // <span
        //   className="cursor-pointer  underline"
        //   onClick={() => setOpenTicket(row.original)}
        // >
        //   {row.original.ticketNo}
        // </span>
        <Link
          href={`/customer-support/open-tickets/${row.original.id}`} // 👈 route to the new page
          className="cursor-pointer underline"
          scroll={false}
        >
          {row.original.ticketNo}
        </Link>
      ),
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => row.original.title,
      enableHiding: false,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'priority',
      header: 'Priority',
      cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
    },
    {
      accessorKey: 'AssignedTo',
      header: 'Current Assignee',
      cell: ({ row }) => (
        <div>
          {(!usersLoading &&
            getUserById(row.original.assigneeUserId)?.fullName) ||
            '...'}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Creation Time',
      cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
    },
    {
      accessorKey: 'CreatedBy',
      header: 'Created By',
      cell: ({ row }) => (
        <div>
          {(!usersLoading &&
            getUserById(row.original.createdByUserId)?.fullName) ||
            '...'}
        </div>
      ),
    },
    {
      accessorKey: 'lock',
      header: 'Lock',
      cell: ({ row }) => <LockBadge lock={row.original.locked} />,
    },
  ];

  const table = useReactTable({
    data: data ?? [],
    columns: columns ?? [],
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // const dataIds: UniqueIdentifier[] = data.map((item) => item.id);

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* filters + actions */}
        <div className="flex justify-end w-full">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline">Filters</span>
                  <span className="lg:hidden">Filters</span>
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== 'undefined' &&
                      column.getCanHide(),
                  )
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <CreateTicketForm onSuccess={onRefresh} />
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table
                  .getRowModel()
                  .rows.map((row) => <NormalRow key={row.id} row={row} />)
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* pagination */}
        {/* ... keep your pagination footer code ... */}
      </div>

      {/* Controlled Ticket Dashboard */}
      {/* {openTicket && (
        <TicketDashboard
          key={openTicket.id}
          ticket={openTicket}
          open={!!openTicket}
          onClose={() => setOpenTicket(null)}
          onUpdate={updateTicketInTable}
        />
      )} */}
    </>
  );
}
