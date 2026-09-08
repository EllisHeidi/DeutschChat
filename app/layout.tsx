import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DeutschChat — Learn German by really using it",
    template: "%s · DeutschChat",
  },
  description:
    "Learn German through a structured A1 curriculum and realistic AI conversations. A1 is free. Always. Premium starts at A2.",
  applicationName: "DeutschChat",
};

export const viewport: Viewport = {
  themeColor: "#F5F0E6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground min-h-dvh antialiased">
        {children}
      </body>
    </html>
  );
}
