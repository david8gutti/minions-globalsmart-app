import { StoreProvider } from "@/redux/storeProvider";
import "../styles/globals.css"
import type { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Minion Dashboard",
  description: "Creado para GlobalSmart"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <StoreProvider>
          <Providers>{children}</Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
