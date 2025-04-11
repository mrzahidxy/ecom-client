"use client";

import { queryClient } from "@/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

;

export default function ClientProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
