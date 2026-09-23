import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hoza.studio"),
  title: "Hoza â€” Websites, Apps and Automation Built Fast",
  description:
    "Hoza designs and develops websites, web applications, mobile products and automation systems for businesses in Indonesia, Singapore and worldwide.",
  keywords: [
    "Digital Product Studio",
    "Web Development Indonesia",
    "App Development Singapore",
    "Custom Software Jakarta",
    "Automation Systems",
    "High-Converting Landing Pages",
    "Next.js Developers",
    "Hoza Studio",
  ],
  authors: [{ name: "Hoza Studio" }],
  creator: "Hoza Studio",
  publisher: "Hoza Studio",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://hoza.studio",
  },
  openGraph: {
    title: "Hoza â€” Websites, Apps and Automation Built Fast",
    description:
      "Websites, applications, mobile products and automation systems built for businesses ready to move forward. Built in Indonesia. Ready for anywhere.",
    url: "https://hoza.studio",
    siteName: "Hoza Digital Product Studio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hoza â€” Digital Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoza â€” Websites, Apps and Automation Built Fast",
    description:
      "Websites, applications, mobile products and automation systems built for businesses ready to move forward.",
    creator: "@hozadigital",
    site: "@hozadigital",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Hoza Digital",
    description:
      "Hoza designs and develops websites, web applications, mobile products and automation systems for ambitious businesses in Indonesia, Singapore and worldwide.",
    url: "https://hoza.studio",
    sameAs: [
      "https://github.com/hozadigital",
      "https://www.instagram.com/hozadigital/",
      "https://x.com/hozadigital",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "ID",
    },
    areaServed: [
      { "@type": "Country", name: "Indonesia" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    priceRange: "$$$",
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "Business Automation",
      "Custom Software Development",
      "Landing Page Optimization",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-hoza-bg text-hoza-white font-sans antialiased selection:bg-[#D4FF00] selection:text-hoza-bg relative">
        {/* Subtle background technical grid & vignette */}
        <div className="fixed inset-0 pointer-events-none bg-grid-tech z-0 opacity-40" />
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,255,0,0.15),rgba(8,5,13,0))] z-0" />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
