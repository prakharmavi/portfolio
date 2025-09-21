import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast";

// Server-side providers wrapper. Avoids client-only contexts for MDX.
export function Providers({ children }: { children: ReactNode }) {
  return (
    // ToastProvider is a client component; we nest it inside without
    // turning this file into a client component, so SSR remains intact.
    // Next will split the subtree at ToastProvider boundary.
    <ToastProvider>{children}</ToastProvider>
  );
}
