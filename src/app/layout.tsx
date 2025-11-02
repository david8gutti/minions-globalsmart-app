import { StoreProvider } from "@/redux/StoreProvider";
import "./globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Minion Dashboard",
  description: "Creado para GlobalSmart",
  icons: {
    icon: "/minion_favico.ico", // ruta en la carpeta public
    shortcut: "/minion_favicon.ico"
  },
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
