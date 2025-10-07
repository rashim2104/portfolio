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
    default: "Rashim R B - Full Stack Developer & IT Engineering Student",
  },
  description: `${home.description} | Full Stack Developer specializing in React.js, Next.js, and Node.js. IT Engineering student at Sri Sairam Institute of Technology with a GPA of 8.59. Experienced in web development, API integration, and event management systems.`,
  keywords: [
    "Rashim R B",
    "Rashim",
    "Rashim Sairam",
    "Rashim Skcript",
    "Rashim Bulkpe",
    "Rashim IEEE",
    "Rashim TEDx",
    "Rashim Developer",
    "Rashim IT",
    "Rashim Engineering",
    "Rashim Chennai",
    "Rashim Tamil Nadu",
    "Rashim Portfolio",
    "Rashim Full Stack",
    "Rashim Web Developer",
    "Rashim React",
    "Rashim Next.js",
    "Rashim Node.js",
    "Rashim QR System",
    "Rashim Event Management",
    "Rashim Sri Sairam",
    "Rashim B.Tech",
    "Rashim GPA 8.59",
    "Rashim Tech Lead",
    "Rashim Intern",
    "Rashim Projects",
    "Rashim Blog",
    "Rashim GitHub",
    "Rashim LinkedIn",
    "Rashim Software Engineer",
    "Rashim IT Engineering",
    "Rashim Sairam IT",
    "Rashim Skcript Intern",
    "Rashim Bulkpe Intern",
    "Rashim IEEE Lead",
    "Rashim TEDx Tech",
    "Rashim QR Tracking",
    "Rashim Eventify",
    "Rashim Web Development",
    "Rashim API Development",
    "Rashim Database",
    "Rashim MongoDB",
    "Rashim SQL",
    "Rashim Python",
    "Rashim Java",
    "Rashim JavaScript",
    "Rashim HTML",
    "Rashim CSS",
    "Rashim Frontend",
    "Rashim Backend",
    "Rashim Full Stack Developer",
    "Rashim IT Engineering Student",
    "Sri Sairam Institute of Technology",
    "Chennai",
    "React.js Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Web Development",
    "Software Engineering",
    "IT Engineering",
    "B.Tech IT",
    "GPA 8.59",
    "IEEE Student Branch",
    "TEDxSriSairamIT",
    "QR Tracking System",
    "Event Management",
    "Bulkpe",
    "Skcript",
    "Portfolio",
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "MongoDB",
    "SQL",
    "Python Developer",
    "Java Developer",
    "JavaScript Developer",
    "Web Applications",
    "API Development",
    "Chennai Tech Community",
    "Sri Sairam IT",
    "Sairam Engineering",
    "Chennai Engineering College",
    "IT Engineering Chennai",
    "Top IT Engineering Student",
    "IEEE SIGHT Fund Winner",
    "Event Management Technology",
    "QR Code System Developer",
    "Technical Blog Writer",
    "Software Solutions",
    "Web Development Portfolio",
    "Chennai Software Developer",
    "Tamil Nadu Tech Community",
    "Engineering Projects",
    "Innovation in Technology",
    "Student Developer",
    "Tech Leadership",
    "Web Development Intern",
    "Software Engineering Intern",
    "IT Solutions Developer"
  ].join(", "),
  authors: [{ name: "Rashim R B", url: "https://rashimrb.com" }],
  creator: "Rashim R B",
  publisher: "Rashim R B",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { 
        url: '/favicon_io/favicon-16x16.png', 
        sizes: '16x16', 
        type: 'image/png',
        rel: 'icon',
        media: '(prefers-color-scheme: light)',
      },
      { 
        url: '/favicon_io/favicon-32x32.png', 
        sizes: '32x32', 
        type: 'image/png',
        rel: 'icon',
        media: '(prefers-color-scheme: light)',
      },
    ],
    shortcut: '/favicon_io/favicon.ico',
    apple: [
      {
        url: '/favicon_io/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        rel: 'apple-touch-icon',
      }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon_io/favicon-32x32.png',
        color: '#000000',
      },
      {
        rel: 'android-chrome-192x192',
        url: '/favicon_io/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon_io/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/favicon_io/site.webmanifest',
  metadataBase: new URL(`https://${baseURL}`),
  openGraph: {
    title: `${person.name} - Full Stack Developer & IT Engineering Student`,
    description: `Full Stack Developer and IT Engineering student at Sri Sairam Institute of Technology. Specializing in React.js, Next.js, and Node.js development. GPA: 8.59. Experienced in web development, API integration, and innovative tech solutions.`,
    url: baseURL,
    siteName: `${person.name}'s Portfolio`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseURL}/images/avatar.jpg`,
        width: 1200,
        height: 630,
        alt: "Rashim R B - Full Stack Developer",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} - Full Stack Developer & IT Engineering Student`,
    description: `Full Stack Developer and IT Engineering student at Sri Sairam Institute of Technology. Specializing in React.js, Next.js, and Node.js development.`,
    images: [`${baseURL}/images/avatar.jpg`],
    creator: "@rashimrb",
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
    canonical: baseURL,
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
  "url": "https://www.rashim.codes",
  "image": "https://www.rashim.codes/images/avatar.jpg",
  "sameAs": [
    "https://github.com/rashim2104",
    "https://linkedin.com/in/rashimraseethali"
  ],
  "jobTitle": "Full Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Sri Sairam Institute of Technology"
  },
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Sri Sairam Institute of Technology",
    "department": "Information Technology"
  },
  "knowsAbout": [
    "React.js",
    "Next.js",
    "Node.js",
    "MongoDB",
    "SQL",
    "Python",
    "Java",
    "JavaScript",
    "Web Development",
    "API Development"
  ],
  "description": "Full Stack Developer and IT Engineering student specializing in React.js, Next.js, and Node.js development."
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
