'use client';
import { ThemeProvider } from "../components/globals/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
function Providers({children}:Readonly<{children:React.ReactNode}>) {
  return (
    <>
      <Toaster />
      <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange >
        {children}
      </ThemeProvider>
    </>
  )
}

export default Providers

