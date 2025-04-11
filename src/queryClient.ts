// queryClient.ts

import { QueryClient } from "@tanstack/react-query";


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Prevent refetch on window focus
            refetchOnWindowFocus: false,
            // Set a custom stale time (e.g., 5 minutes)
            staleTime: 1000 * 60 * 5,
            // Number of retry attempts on failure
            retry: 1,
        },
    },
});
