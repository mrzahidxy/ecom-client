"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { StatusUpdateDialog } from "./user-role-update.component";
import { useToast } from "@/hooks/use-toast";
import { DynamicTable } from "@/components/ui/dynamic-data-table.component";

type Props = {};

const UserPage = (props: Props) => {
  const { toast } = useToast();

  // Table columns
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        return <Badge variant="outline">{row?.original?.role}</Badge>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => {
        let date = new Date(row?.original?.createdAt);
        return date.toLocaleString();
      },
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="text-2xl cursor-pointer">
            {/* Pass refetch to refresh data when status is updated */}
            <StatusUpdateDialog id={row.original.id} />
          </div>
        );
      },
    },
  ];

  return (
    <DynamicTable
      columns={columns}
      url="/users"
      title="Users"
      queryKey="usersList"
    />
  );
};

export default UserPage;
