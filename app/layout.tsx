import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import Header from "@/Components/layout/Header";
import Footer from "@/Components/layout/Footer";
import { ThemeProvider } from "@/Components/theme/ThemeProvider";
import Breadcrumbs from "@/Components/navigation/Breadcrumbs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.assessmentTitle,
  description: siteConfig.description,
};

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">    
        <ThemeProvider>
          <Header />
          <Breadcrumbs />
          <div className="mx-auto w-full max-w-5xl flex-1 p-4">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
