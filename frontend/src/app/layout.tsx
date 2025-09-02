import type { Metadata } from "next";
import { Poppins } from "next/font/google"; // Import Poppins
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Removed Geist fonts as Poppins will be the primary font.

export const metadata: Metadata = {
  title: "Personal Finance AI Assistant",
  description: "An AI assistant for comprehensive financial planning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased bg-gradient-to-br from-gray-900 via-black to-gray-950`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
