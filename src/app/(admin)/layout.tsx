"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "../(root)/Navbar.component";
import Sidebar from "./Sidebar.component";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { status, data } = useSession();
  const router = useRouter();
  const userRole = data?.user?.role;

  useEffect(() => {
    if (status === "unauthenticated" || (status === "authenticated" && userRole !== "ADMIN")) {
      router.push("/"); // Redirect if not authenticated or not an admin
    }
  }, [status, userRole, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 px-16 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
