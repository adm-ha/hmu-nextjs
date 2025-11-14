// src/app/layout.tsx
import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";

const encodeSans = Encode_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-encode-sans",
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "HireMeUp",
  description: "Stop applying into the black hole. Get your next job with HireMeUp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ... (all your scripts, GTM, Segment, VL, Sync) ... */}
        <Script id="gtm" strategy="afterInteractive">{/* ... GTM ... */}</Script>
        <Script id="segment" strategy="afterInteractive">{/* ... Segment ... */}</Script>
        <Script id="viral-loops-loader" strategy="afterInteractive" src="https://app.viral-loops.com/widgetsV2/core/loader.js"></Script>
        <Script id="vl-sync-script" strategy="afterInteractive">{/* ... VL Sync Script ... */}</Script>
      </head>
      
      {/* --- THIS IS THE FIX --- */}
      {/* Added transition-colors and duration-300 */}
      <body className={`${encodeSans.variable} bg-background text-foreground transition-colors duration-300 ease-in-out`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          enableSystem
          // disableTransitionOnChange has been REMOVED
        >
          {/* --- END OF FIX --- */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NN5RS9FZ"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>

          {/* This is the main layout wrapper (backgrounds removed) */}
          <div
            className="relative z-10 flex min-h-screen flex-col"
            style={{
              fontFamily: "var(--font-encode-sans)",
            }}
          >
            <div className="relative z-10 flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}