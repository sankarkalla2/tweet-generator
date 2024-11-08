"use client";

import { useState } from "react";
import { useEffect } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
