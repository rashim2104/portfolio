import { Button, Column, Flex, Text } from "@/once-ui/components";
import Link from "next/link";

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
        maxWidth="600px"
        textAlign="center"
      >
        <Text
          as="h1"
          size="3xl"
          weight="bold"
          color="brand"
        >
          404
        </Text>
        <Text
          as="h2"
          size="xl"
          weight="semibold"
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
          <Button
            as={Link}
            href="/"
            variant="primary"
          >
            Return Home
          </Button>
          <Button
            as={Link}
            href="/projects"
            variant="secondary"
          >
            View Projects
          </Button>
        </Flex>
      </Column>
    </Flex>
  );
}
