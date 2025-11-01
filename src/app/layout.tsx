import { StoreProvider } from "@/redux/StoreProvider";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <StoreProvider>
            {children}
        </StoreProvider>
      </body>
    </html>
  );
}
