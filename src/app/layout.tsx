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

export const metadata: Metadata = {
  title: {
    template: "%s | Rashim R B",
    default: "Rashim R B",
  },
  description: home.description,
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
    title: `${person.firstName}'s Portfolio`,
    description: "Portfolio website showcasing my work.",
    url: baseURL,
    siteName: `${person.firstName}'s Portfolio`,
    locale: "en_US",
    type: "website",
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
    </Flex>
  );
}
