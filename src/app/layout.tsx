// src/app/layout.tsx (REDUCED BLUR)
import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
    <html lang="en">
      <head>
        {/* ... (all your scripts remain the same) ... */}
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NN5RS9FZ');`}
        </Script>
        {/* Segment */}
        <Script id="segment" strategy="afterInteractive">
          {`!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="0eAeTh9yawtFd4dbdeGIF25hG8TjoJ50";;analytics.SNIPPET_VERSION="5.2.0";
          analytics.load("0eAeTh9yawtFd4dbdeGIF25hG8TjoJ50");
          analytics.page();
          }}();`}
        </Script>
        {/* Viral Loops Loader */}
        <Script
          id="viral-loops-loader"
          strategy="afterInteractive"
          src="https://app.viral-loops.com/widgetsV2/core/loader.js"
          data-campaign-id="MMH9S7vPz7pWTE4HvM0ohBpAIYA"
        ></Script>
      </head>
      
      <body className={`${encodeSans.variable}`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NN5RS9FZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <div
          className="min-h-screen bg-cover bg-fixed bg-center text-white"
          style={{
            backgroundImage: "url('/my-background.png')", 
            backgroundColor: '#1a132c', 
            fontFamily: "var(--font-encode-sans)",
          }}
        >
          {/* --- THIS IS THE CHANGE --- */}
          {/* Changed from `backdrop-blur-md` to `backdrop-blur-sm` */}
          <div className="relative z-10 flex min-h-screen flex-col bg-black/40 backdrop-blur-sm">
            {/* --- END OF CHANGE --- */}
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}