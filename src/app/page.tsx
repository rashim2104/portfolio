import React from "react";

import { Column, Flex, Text, Button } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { home, person } from "@/app/resources/content";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Home() {
  return (
    <Column maxWidth="m">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: person.name,
            jobTitle: person.role,
            url: `https://${baseURL}`,
            sameAs: [
              "https://github.com/rashim2104",
              "https://linkedin.com/in/rashimraseethali",
            ],
          }),
        }}
      />
      <Flex gap="32" direction="column">
        <Flex gap="8" direction="column">
          <Text variant="display-strong-l">{home.headline}</Text>
          <Text variant="body-default-l" onBackground="neutral-weak">
            {home.subline}
          </Text>
        </Flex>
        
        <Flex gap="16" direction="column">
          <Text variant="heading-strong-l">About Me</Text>
          <Text variant="body-default-l" onBackground="neutral-weak">
            {home.about}
          </Text>
        </Flex>

        <Flex gap="16">
          <Button
            href="/resumes/Rashim-Resume.pdf"
            download="Rashim-Resume.pdf"
            variant="primary"
            role="link"
          >
            Download Resume
          </Button>
          <Button
            href="https://linkedin.com/in/rashimraseethali"
            variant="secondary"
            target="_blank"
            rel="noopener noreferrer"
            role="link"
          >
            Connect on LinkedIn
          </Button>
        </Flex>
      </Flex>
    </Column>
  );
}
