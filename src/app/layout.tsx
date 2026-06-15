import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://egemotors.net'),
  title: {
    default: "Egemotor360 | Premium Araç ve Motosiklet Kiralama",
    template: "%s | Ege Motors"
  },
  description: "Ege Motors ile premium lüks araç ve motosiklet kiralama, satın alma ve profesyonel yol yardım hizmetleri. Hayallerinizdeki sürüş deneyimini yaşayın.",
  keywords: ["araç kiralama", "lüks araç", "motosiklet kiralama", "7/24 yol yardım", "oto tamir", "Ege Motors", "rent a car", "premium araç"],
  authors: [{ name: "Ege Motors" }],
  creator: "Ege Motors",
  publisher: "Ege Motors",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://egemotors.net",
    siteName: "Ege Motors",
    title: "Egemotor360 | Premium Araç ve Motosiklet Kiralama",
    description: "Premium lüks araç ve motosiklet kiralama, profesyonel yol yardım hizmetleri.",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 800,
        alt: "Ege Motors Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Egemotor360 | Premium Araç ve Motosiklet Kiralama",
    description: "Premium lüks araç ve motosiklet kiralama, profesyonel yol yardım hizmetleri.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
