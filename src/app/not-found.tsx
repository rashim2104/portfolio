import { Button, Column, Flex, Text } from "@/once-ui/components";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Rashim R B",
  description: "The page you're looking for doesn't exist. Return to Rashim R B's portfolio to explore projects, blog posts, and more.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "404 - Page Not Found | Rashim R B",
    description: "The page you're looking for doesn't exist. Return to Rashim R B's portfolio to explore projects, blog posts, and more.",
    url: "https://www.rashim.codes/404",
    type: "website",
  },
};

export default function NotFound() {
  return (
    <Flex
      fillWidth
      fillHeight
      horizontal="center"
      vertical="center"
      padding="l"
    >
      <Column
        horizontal="center"
        vertical="center"
        gap="m"
        maxWidth={600}
        align="center"
      >
        <Text
          as="h1"
          size="xl"
          weight="strong"
          color="brand"
        >
          404
        </Text>
        <Text
          as="h2"
          size="l"
          weight="strong"
        >
          Page Not Found
        </Text>
        <Text
          color="neutral"
          size="m"
        >
          Oops! The page you're looking for seems to have vanished into the digital void.
          Let's get you back on track!
        </Text>
        <Flex
          gap="m"
          marginTop="l"
        >
          <Link href="/" passHref legacyBehavior>
            <Button variant="primary">
              Return Home
            </Button>
          </Link>
          <Link href="/work" passHref legacyBehavior>
            <Button variant="secondary">
              View Projects
            </Button>
          </Link>
        </Flex>
      </Column>
    </Flex>
  );
}
