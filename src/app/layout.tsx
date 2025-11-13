// src/app/layout.tsx (TRULY FIXED LAYOUT)
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
        {/* ... (all your scripts) ... */}
      </head>
      
      {/* Base colors applied here */}
      <body className={`${encodeSans.variable} bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          enableSystem
          disableTransitionOnChange
        >
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NN5RS9FZ"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>

          {/* This is the main layout wrapper.
            1. It applies layout (flex, min-h-screen, flex-col) ALWAYS.
            2. It applies the dark mode cosmetics (image, overlay) ONLY in dark mode.
          */}
          <div
            className="relative z-10 flex min-h-screen flex-col bg-cover bg-fixed bg-center dark:bg-[url('/my-background.png')]"
            style={{
              fontFamily: "var(--font-encode-sans)",
            }}
          >
            {/* This overlay wrapper is also theme-aware */}
            <div className="relative z-10 flex min-h-screen flex-col dark:bg-black/40 dark:backdrop-blur-sm">
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