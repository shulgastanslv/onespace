// app/providers.tsx
"use client";

import {NextUIProvider} from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react';
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { Toaster } from 'sonner';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <Toaster />
        <NextThemesProvider attribute="class" defaultTheme="dark">
          {children}
        </NextThemesProvider>
      </SessionProvider>
    </NextUIProvider>
  )
}