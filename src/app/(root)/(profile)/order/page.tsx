"use client";

import { DataTable } from "@/components/ui/data-table.component";
import privateRequest from "@/healper/privateRequest";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import React, { useEffect, useState } from "react";

type Props = {};

const OrdersPage = (props: Props) => {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/orders`;
    try {
      const response = await privateRequest.get(endpoint);
      // return response.data.data;
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => {

        console.log(row)
        return <Link href={`/order/${row.original.id}`}>{row?.original?.id}</Link>;
      },
    },
    {
      accessorKey: "netAmount",
      header: "Amount",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
  ];

  return (
    <div className="container">
      <h4 className="font-semibold text-xl">Orders List</h4>
      <DataTable hideButtton={true} columns={columns} data={orders} />
    </div>
  );
};

export default OrdersPage;
