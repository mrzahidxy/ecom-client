"use client";

import { DataTable } from "@/components/ui/data-table.component";
import { DialogContent } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import privateRequest from "@/healper/privateRequest";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { DynamicTable } from "@/components/ui/dynamic-data-table.component";
import { Edit2, EditIcon } from "lucide-react";
import Link from "next/link";

// Define the product interface to type the data
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Define the API response structure
interface ProductResponse {
  data: {
    data: Product[];
  };
}

// Separate component for rendering the image in a table cell
const ImageCell: React.FC<{ row: { original: Product } }> = ({ row }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Image
        width={60}
        height={60}
        alt={`Image of ${row.original.name}`}
        src={row.original.image}
        className="cursor-pointer"
      />
    </DialogTrigger>
    <DialogContent>
      <Image
        width={400}
        height={400}
        alt={`Image of ${row.original.name}`}
        src={row.original.image}
        className="w-full h-auto"
      />
    </DialogContent>
  </Dialog>
);

// Define the columns for the DataTable
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ImageCell,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return (
        <div>
          <Link href={`/admin/products/edit/${row.original.id}`}>
            <EditIcon />
          </Link>
        </div>
      );
    },
  },
];

const ProductPage: React.FC = () => {
  return (
    <DynamicTable
      title="Products"
      url="/products"
      buttonText="Add Product"
      addUrl="/admin/products/add"
      columns={columns}
      queryKey="productsList"
    />
  );
};

export default ProductPage;
