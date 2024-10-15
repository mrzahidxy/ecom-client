"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import privateRequest from "@/healper/privateRequest";
import { DataTable } from "./data-table.component";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";
import { Button } from "./button";

interface DynamicTableProps<TData> {
  url: string;
  addUrl?: string;
  columns: ColumnDef<TData>[];
  title?: string;
  buttonText?: string;
  queryKey: string;
}

export function DynamicTable<TData>({
  url,
  addUrl,
  columns,
  title,
  buttonText,
  queryKey,
}: DynamicTableProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const limit = 10;

  const fetchOrders = async (page: number, limit: number) => {
    const response = await privateRequest.get(
      `${url}?page=${page}&limit=${limit}`
    );
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKey, page],
    queryFn: () => fetchOrders(page, limit),
  });

  useEffect(() => {
    router.push(`?page=${page}`);
  }, [page, router]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching orders: {error.message}</div>;

  const tableData = data?.data?.collection;
  const pagination = data?.data?.pagination;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="space-y-4 flex flex-col">
      <h1 className="text-2xl font-bold">{title}</h1>
      {buttonText && (
        <Button className="self-end" onClick={() => router.push(addUrl!)}>
          {buttonText}
        </Button>
      )}
      <DataTable columns={columns} data={tableData} />

      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>
          {[...Array(pagination?.totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                onClick={() => handlePageChange(index + 1)}
                isActive={page === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
