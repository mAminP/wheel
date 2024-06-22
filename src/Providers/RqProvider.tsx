"use client";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RqProvider(props: PropsWithChildren) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          staleTime: 5 * 1000, // 5sec
        },
      },
    }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools
        position={"bottom"}
        buttonPosition={"bottom-left"}
        initialIsOpen={false}
      />
    </QueryClientProvider>
  );
}
