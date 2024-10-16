"use client";

import { DataTable } from "@/components/ui/data-table.component";
import privateRequest from "@/healper/privateRequest";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import AddressModal from "./Adddress-modal.component";
import { CustomImage } from "@/ui/common/Custom-Image.component";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Id",
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

const Profile = (props: Props) => {
  const [user, setUser] = useState<{
    email: string;
    name: string;
  }>({
    email: "",
    name: "",
  });

  const [orders, setOrders] = useState<any[]>([]);

  const [refreshKey, setRefreshKey] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const fetchOrders = async () => {
    try {
      const response = await privateRequest.get("/orders");
      setOrders(response.data.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchUserInfo = async () => {
    setIsLoading(true);
    try {
      const response = await privateRequest.get("/auth/me");
      setUser(response.data.data);
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchUserInfo();
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [refreshKey]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-5">Products</h1>
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <div className="md:col-span-1 shadow p-6 ">
            <div className="relative w-full mb-2">
              <CustomImage src="/placeholder.svg?height=200&width=200" />
            </div>
            <div className="bg-white  rounded-lg space-y-4">
              <h2 className="text-2xl font-bold">User Information</h2>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Name:</span>{" "}
                <span>{user?.name}</span>
                <span className="font-semibold">Email:</span>{" "}
                <span>{user?.email}</span>
                <span className="font-semibold">Address:</span>{" "}
              </div>
              <AddressModal user={user} onRefresh={handleRefresh} />
            </div>
          </div>
        )}
        <div className="md:col-span-2 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
          <h4>Recent Orders</h4>
          <DataTable  columns={columns} data={orders} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
