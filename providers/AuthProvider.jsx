"use client";

import { createContext } from "react";
import { useSession } from "@/lib/auth-client";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const session = useSession();

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
}