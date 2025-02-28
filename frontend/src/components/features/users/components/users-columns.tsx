/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import LongText from "@/components/long-text";

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    meta: {
      className: cn(
        "sticky md:table-cell left-0 z-10 rounded-tl",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
      ),
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.getValue("nama")}</LongText>
    ),
    meta: {
      className: cn(
        "drop-shadow-[0_1px_2px_rgb(0_0_0_/_0.1)] dark:drop-shadow-[0_1px_2px_rgb(255_255_255_/_0.1)] lg:drop-shadow-none",
        "bg-background transition-colors duration-200 group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted",
        "sticky left-6 md:table-cell",
      ),
    },
    enableHiding: false,
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-fit text-nowrap">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "nim",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIM" />
    ),
    cell: ({ row }) => <div>{row.getValue("nim")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "no_telepon",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No Telephone" />
    ),
    cell: ({ row }) => <div>{row.getValue("no_telepon")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      const gender = row.getValue("gender");
      return <div>{toTitleCase(gender as string)}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "alamat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alamat" />
    ),
    cell: ({ row }) => <div>{row.getValue("alamat")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "motivasi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Motivasi" />
    ),
    cell: ({ row }) => <div>{row.getValue("motivasi")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "fakultas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fakultas" />
    ),
    cell: ({ row }) => {
      const fakultas = row.getValue("fakultas");
      return <div>{toTitleCase(fakultas as string)}</div>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "prodi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prodi" />
    ),
    cell: ({ row }) => {
      const prodi = row.getValue("prodi");
      return <div>{toTitleCase(prodi as string)}</div>;
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: DataTableRowActions,
  },
];
