import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "./components/SiteFooter";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Baccanale",
    template: "%s | Baccanale",
  },
  description: "Archivio digitale dei menu del Baccanale",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col space-y-6">
        <section className="page-gutter flex min-h-full flex-1 flex-col">
          {children}
        </section>
        <SiteFooter />
      </body>
    </html>
  );
};

export default RootLayout;
