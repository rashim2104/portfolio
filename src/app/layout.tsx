import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";
import classNames from "classnames";
import { Footer, Header, RouteGuard } from "@/components";
import { baseURL, effects, style } from "@/app/resources";
import { Inter } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";
import { person, home } from "@/app/resources/content";
import { Background, Column, Flex, ToastProvider } from "@/once-ui/components";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    template: "%s | Rashim R B",
    default: "Rashim R B - Full Stack Developer | TypeScript, React Native, Node.js",
  },
  description: `Full Stack Developer at Skcript specializing in TypeScript, React Native, Node.js, and cloud-native architectures. Building production-grade email services, mobile apps, and scalable backend systems.`,
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
    title: `${person.name} - Full Stack Developer`,
    description: `Full Stack Developer at Skcript. Building production-grade systems with TypeScript, React Native, Node.js, and cloud-native architectures. Email services, mobile apps, backend systems.`,
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
    title: `${person.name} - Full Stack Developer`,
    description: `Full Stack Developer at Skcript. Building production-grade systems with TypeScript, React Native, Node.js, and cloud-native architectures.`,
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

const primary = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

type FontConfig = {
  variable: string;
};

const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;

const code = Source_Code_Pro({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <Flex
      as="html"
      lang="en"
      background="page"
      data-neutral={style.neutral}
      data-brand={style.brand}
      data-accent={style.accent}
      data-solid={style.solid}
      data-solid-style={style.solidStyle}
      data-theme={style.theme}
      data-border={style.border}
      data-surface={style.surface}
      data-transition={style.transition}
      className={classNames(
        primary.variable,
        secondary ? secondary.variable : "",
        tertiary ? tertiary.variable : "",
        code.variable,
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            link[rel="icon"],
            link[rel="shortcut icon"],
            link[rel="apple-touch-icon"] {
              border-radius: 50% !important;
              overflow: hidden !important;
            }
            link[rel="icon"] img,
            link[rel="shortcut icon"] img,
            link[rel="apple-touch-icon"] img {
              border-radius: 50% !important;
              overflow: hidden !important;
            }
          `
        }} />
      </head>
      <ToastProvider>
        <Column style={{ minHeight: "100vh" }} as="body" fillWidth margin="0" padding="0">
          <Background
            mask={{
              cursor: effects.mask.cursor,
              x: effects.mask.x,
              y: effects.mask.y,
              radius: effects.mask.radius,
            }}
            gradient={{
              display: effects.gradient.display,
              x: effects.gradient.x,
              y: effects.gradient.y,
              width: effects.gradient.width,
              height: effects.gradient.height,
              tilt: effects.gradient.tilt,
              colorStart: effects.gradient.colorStart,
              colorEnd: effects.gradient.colorEnd,
              opacity: effects.gradient.opacity as
                | 0
                | 10
                | 20
                | 30
                | 40
                | 50
                | 60
                | 70
                | 80
                | 90
                | 100,
            }}
            dots={{
              display: effects.dots.display,
              color: effects.dots.color,
              size: effects.dots.size as any,
              opacity: effects.dots.opacity as any,
            }}
            grid={{
              display: effects.grid.display,
              color: effects.grid.color,
              width: effects.grid.width as any,
              height: effects.grid.height as any,
              opacity: effects.grid.opacity as any,
            }}
            lines={{
              display: effects.lines.display,
              opacity: effects.lines.opacity as any,
            }}
          />
          <Flex fillWidth minHeight="16"></Flex>
          <Header />
          <Flex
            position="relative"
            zIndex={0}
            fillWidth
            paddingY="l"
            paddingX="l"
            horizontal="center"
            flex={1}
          >
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </ToastProvider>
      <Analytics />
    </Flex>
  );
}
