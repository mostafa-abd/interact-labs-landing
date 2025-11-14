<<<<<<< HEAD
import Script from 'next/script';
import './globals.css';
import Header from './includes/header';
import Footer from './includes/footer';
import { LanguageProvider } from './context/LanguageContext';
import VirtualPageViewTracker from './components/VirtualPageViewTracker';
=======
"use client";

import Script from "next/script";
import "./globals.css";
import Header from "./includes/header";
import Footer from "./includes/footer";
import { LanguageProvider } from "./context/LanguageContext";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
>>>>>>> f18545686acc6521b31040b98d5706c0afdb07d5

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
<<<<<<< HEAD
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
=======
        {/* Google Tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-314666289"
        />
        <Script
          id="google-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-314666289');
            `,
          }}
        />

>>>>>>> f18545686acc6521b31040b98d5706c0afdb07d5
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){
                w[l]=w[l]||[];
                w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
                j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5R7FJH6B');
            `,
          }}
        />
      </head>

      <body className="antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PGCFKWZJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <LanguageProvider>
          <VirtualPageViewTracker />
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
