import "@/styles/geist.css";
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Footer, Header } from "@/components";
import { baseURL } from "@/app/resources";
import { person } from "@/app/resources/content";
import { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  title: {
    template: "%s | Rashim R B",
    default: "Rashim R B - Software Developer | TypeScript, React Native, Node.js",
  },
  description: `Software Developer at Skcript. I build email infrastructure, mobile apps, and backend systems with TypeScript, React Native, and Node.js. Based in Chennai.`,
  keywords: [
    "Rashim R B",
    "Rashim",
    "Software Developer",
    "Full Stack Developer",
    "React Native Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Next.js Developer",
    "Chennai Developer",
    "Skcript",
    "Sri Sairam Institute of Technology",
    "FeatureOS Mobile",
    "Email Service",
    "Redis",
    "PostgreSQL",
    "Docker",
    "AWS",
  ].join(", "),
  authors: [{ name: "Rashim R B", url: "https://rashim.in" }],
  creator: "Rashim R B",
  publisher: "Rashim R B",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/favicon_io/site.webmanifest',
  metadataBase: new URL(`https://${baseURL}`),
  openGraph: {
    title: `${person.name} - Software Developer`,
    description: `Software Developer at Skcript. I build email infrastructure, mobile apps, and backend systems with TypeScript, React Native, and Node.js.`,
    url: `https://${baseURL}`,
    siteName: person.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `https://${baseURL}/images/avatar.jpg`,
        width: 1200,
        height: 630,
        alt: `${person.name} - Software Developer`,
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} - Software Developer`,
    description: `Software Developer at Skcript. I build email infra, mobile apps, and backend systems with TypeScript, React Native, and Node.js.`,
    images: [`https://${baseURL}/images/avatar.jpg`],
    creator: "@rashimbuilds",
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
  alternates: {
    canonical: `https://${baseURL}`,
  },
  verification: {
    google: "aORBuZX3pcK4_x1Tb98R52KmbozBWMRFQbmd_egUGlQ",
  },
};

// Add JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Rashim R B",
  "url": "https://rashim.in",
  "email": "hello@rashim.in",
  "image": "https://rashim.in/images/avatar.jpg",
  "sameAs": [
    "https://github.com/rashim2104",
    "https://linkedin.com/in/rashimraseethali",
    "https://x.com/rashimbuilds"
  ],
  "jobTitle": "Software Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Skcript"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Sri Sairam Institute of Technology",
    "department": "Information Technology"
  },
  "knowsAbout": [
    "TypeScript",
    "JavaScript",
    "React Native",
    "Expo",
    "React.js",
    "Next.js",
    "Node.js",
    "Redis",
    "PostgreSQL",
    "Docker",
    "AWS",
    "REST APIs",
    "Web Development"
  ],
  "description": "Software Developer at Skcript building production-grade systems with TypeScript, React Native, and cloud-native architectures."
};

// ImageObject schema — helps the portrait surface in Google Image search for "Rashim"
const imageSchema = {
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "contentUrl": "https://rashim.in/images/avatar.jpg",
  "url": "https://rashim.in/images/avatar.jpg",
  "name": "Rashim R B — Software Developer",
  "caption": "Rashim R B, Software Developer based in Chennai",
  "creditText": "Rashim R B",
  "author": { "@type": "Person", "name": "Rashim R B" },
  "copyrightHolder": { "@type": "Person", "name": "Rashim R B" },
  "representativeOfPage": true,
};

// Website schema for overall site structure
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Rashim R B",
  "url": "https://rashim.in",
  "description": "Software Developer specializing in TypeScript, React Native, and Node.js. Building production-grade systems with modern technologies.",
  "author": {
    "@type": "Person",
    "name": "Rashim R B"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://rashim.in/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
        />
      </head>
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
          backgroundColor: "var(--color-bg)",
          color: "var(--color-primary)",
          fontFamily: "var(--font-sans)",
        }}
      >
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main
          id="main-content"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "var(--space-16)",
            paddingBottom: "var(--space-16)",
            paddingLeft: "var(--space-6)",
            paddingRight: "var(--space-6)",
          }}
        >
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
