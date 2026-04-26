"use client"
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient()
export const Providers = ({children} : {children : React.ReactNode})=>{
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
      {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}

