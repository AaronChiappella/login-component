'use client';

import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ReactNode } from "react";

// Definir los tipos de los props
interface ProviderProps {
  children: ReactNode; // Tipar 'children' como ReactNode
  session?: Session; // Tipar 'session' como 'Session' de next-auth/react
}

export default function Provider({ children, session }: ProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}
