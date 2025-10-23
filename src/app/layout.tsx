import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./includes/header";
import Footer from "./includes/footer";
const inter = Inter({
  variable: "--font-Inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interact Labs",
  description: " Interact Labs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
<Header/>
        {children}
        <Footer/>

      </body>
    </html>
  );
}
