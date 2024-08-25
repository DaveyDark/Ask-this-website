// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "@next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

// Import Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "AskThisWebsite",
  description: "Ask questions about any website.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        {/* No Google Fonts link needed */}
      </head>
      <body className={`${poppins.className} min-h-screen antialiased bg-background text-foreground`}>
        <Providers>
          <main className="flex min-h-screen flex-col">{children}</main>
        </Providers>
      </body>
    </html>
  );
}