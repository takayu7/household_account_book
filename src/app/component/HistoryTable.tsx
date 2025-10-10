"use client";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LuPenLine } from "react-icons/lu";

import { dateToString, formatPrice } from "@/lib/utils";

import { EditDialog } from "@/app/component/EditDialog";

import { sampleData } from "@/lib/sampleData";

import { TableType } from "@/lib/type";

const data = sampleData.map((item) => {
  const totalCost = item.detail.reduce((sum, detail) => sum + detail.cost, 0);
  return {
    id: item.id,
    date: dateToString(item.date),
    cost: totalCost,
    memo: item.memo,
  };
});

// ActionsCell コンポーネントを作成
const ActionsCell = ({ rowData }: { rowData: TableType }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleEdit = () => {
    console.log("編集対象データ:", rowData);
    setIsOpen(true);
  };

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleEdit}>
        <LuPenLine />
      </Button>
      <EditDialog open={isOpen} setOpen={setIsOpen} editData={sampleData.find(item=> item.id === rowData.id)} />
</>
  );
};

export const columns: ColumnDef<TableType>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
    filterFn: (row, id, value) => {
      if (!value) return true;
      const rowDate = row.getValue(id) as string;
      // 完全一致または部分一致でフィルタ
      return rowDate.includes(value);
    },
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right">cost</div>,
    cell: ({ row }) => {
      const cost = parseFloat(row.getValue("cost"));
      // Format the cost as a dollar cost
      const formatted = formatPrice(cost);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionsCell rowData={row.original} />,
  },
];

export function HistoryTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5, // 1ページあたり5行表示
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card className="flex flex-col gap-2 w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Input</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
          <div className="flex items-center py-4 gap-2">
            <Input
              type="date"
              placeholder="Filter dates..."
              value={
                (table.getColumn("date")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) => {
                const selectedDate = event.target.value;
                // 日付フィルターを設定（YYYY-MM-DD形式をYYYY-MM-DD形式でフィルタ）
                table.getColumn("date")?.setFilterValue(selectedDate);
              }}
              className="max-w-sm"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.getColumn("date")?.setFilterValue("")}
            >
              clear
            </Button>
          </div>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
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
          <div className="flex items-center justify-center space-x-2 py-2">
            <div className="space-x-2">
              <Button
                variant="outline"
                className="w-20"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                className="w-20"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
      </CardContent>
    </Card>
  );
}
