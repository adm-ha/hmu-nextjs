// src/app/layout.tsx (NEW SYNC SCRIPT)
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
        {/* Google Tag Manager (FIXED) */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NN5RS9FZ');`}
        </Script>
        
        {/* Segment */}
        <Script id="segment" strategy="afterInteractive">
          {`!function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="0eAeTh9yawtFd4dbdeGIF2B5hG8TjoJ50";;analytics.SNIPPET_VERSION="5.2.0";
          analytics.load("0eAeTh9yawtFd4dbdeGIF2B5hG8TjoJ50");
          analytics.page();
          }}();`}
        </Script>
        
        {/* Viral Loops Loader */}
        <Script
          id="viral-loops-loader"
          strategy="afterInteractive"
          src="https://app.viral-loops.com/widgetsV2/core/loader.js"
        ></Script>

        {/* --- THIS IS THE NEW SYNC SCRIPT --- */}
        <Script id="vl-sync-script" strategy="afterInteractive">
          {`
            (function() {
              const STORAGE_KEY = 'waitlistUser';
              // We'll listen for any campaign, but you can specify yours
              // const CAMPAIGN_ID = 'F2KeFLmT4nXJfYnzF1fNL7eMNS8'; 

              console.log('[VL SYNC] Global listener attached.');

              function getStatusLevel(referrals) {
                if (referrals >= 10) return 'G.O.A.T';
                if (referrals >= 5) return 'Power Up';
                if (referrals >= 2) return 'Main Character';
                if (referrals >= 1) return 'Insider';
                return 'On the List';
              }

              function saveUserData(userData) {
                if (userData && userData.email && userData.referralCode) {
                  console.log('[VL SYNC] Found user data. Saving to localStorage...', userData);
                  
                  const userToSave = {
                    email: userData.email,
                    referralCount: userData.referralsCount || 0,
                    statusLevel: getStatusLevel(userData.referralsCount || 0),
                    referralCode: userData.referralCode
                  };
                  
                  const currentData = localStorage.getItem(STORAGE_KEY);
                  
                  // Only save if it's different to prevent loops
                  if (currentData !== JSON.stringify(userToSave)) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(userToSave));
                    console.log('[VL SYNC] SUCCESS: User data saved.');
                  }
                }
              }

              // This function runs when the global VL object is ready
              function onVlReady(event) {
                console.log('[VL SYNC] "vl:ready" event fired.');
                const widget = event.detail;
                
                // Try to save immediately
                saveUserData(widget.data?.user); 
                
                // Attach listeners for future events
                
                // This is for returning users
                widget.on('stage', (stageEvent) => {
                  console.log('[VL SYNC] "stage" event fired:', stageEvent.detail.stage);
                  if (stageEvent.detail.stage === 'sharing') {
                    saveUserData(stageEvent.detail.data?.user);
                  }
                });

                // This is for new users
                widget.on('join', (joinEvent) => {
                  console.log('[VL SYNC] "join" event fired.');
                  saveUserData(joinEvent.detail.data?.user);
                });
              }

              // --- Main Execution ---
              // We add the 'vl:ready' listener immediately
              window.addEventListener('vl:ready', onVlReady, { once: true });

            })();
          `}
        </Script>
        {/* --- END OF SYNC SCRIPT --- */}
      </head>
      
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

          <div
            className="relative z-10 flex min-h-screen flex-col bg-cover bg-fixed bg-center dark:bg-[url('/my-background.png')]"
            style={{
              fontFamily: "var(--font-encode-sans)",
            }}
          >
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