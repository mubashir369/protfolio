import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/ui/Preloader";
import { InstallAppUI } from "@/components/ui/InstallAppUI";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export const metadata: Metadata = {
  title: "Mubashir | Full Stack Developer",
  description: "Portfolio of Muhammed Mubashir - Full Stack Developer",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        suppressHydrationWarning
        // Removed transition-colors duration-300 to prevent theme flashing on load
        className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <Preloader />
          <Header />
          <main className="relative">{children}</main>
          <FloatingWhatsApp />
          <InstallAppUI />
        </ThemeProvider>
      </body>
    </html>
  );
}