import type { Metadata } from "next";
import "./globals.css";
import Header from "./includes/header";
import Footer from "./includes/footer";
import { LanguageProvider } from "./context/LanguageContext";

export const metadata: Metadata = {
  title: "Shop Interact",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <LanguageProvider>
        <body className="antialiased">
          <Header />
          {children}
          <Footer />
        </body>
      </LanguageProvider>
    </html>
  );
}
