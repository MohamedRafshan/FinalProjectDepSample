import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/providers/theme-provider"


import "./globals.css";


import  ToasterProvider  from "@/providers/toast-provider";
// import ActiveStatus from "@/components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agriculture Marketplace",
  description: "Advanced Engineering Project Group 15",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
      <head>
          <script
            type="text/javascript"
            src="https://www.payhere.lk/lib/payhere.js"
            async
          ></script>
        </head>
        <body className={inter.className}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
          >
            <ToasterProvider/>
            {/* <ActiveStatus/> */}
            
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
