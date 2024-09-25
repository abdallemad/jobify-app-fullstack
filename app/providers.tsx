'use client';

import { ThemeProvider } from "../components/globals/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient , QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { useState } from "react";

function Providers({children}:Readonly<{children:React.ReactNode}>) {
  const [queryClient] = useState(()=>{
    return new QueryClient({
      defaultOptions:{
        queries:{
          staleTime:60 * 1000 * 5
        }
      }
    })
  })

  return (
    <>
      <Toaster />
        <ThemeProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange >
          <QueryClientProvider client={queryClient}>
                  {children}
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
    </>
  )
}

export default Providers

