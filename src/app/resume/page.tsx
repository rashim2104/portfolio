import React from "react";
import { Column, Flex, Text, Button } from "@/once-ui/components";
import { baseURL } from "@/app/resources";

export async function generateMetadata() {
  const title = "Resume - Rashim R B";
  const description = "View Rashim R B's resume - Full Stack Developer and IT Engineering Student";
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/resume`,
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

export default function Resume() {
  return (
    <Column maxWidth="l" fillWidth>
      <Flex gap="24" direction="column">
        <Flex gap="8" direction="column">
          <Text variant="display-strong-l">Resume</Text>
          <Text variant="body-default-l" onBackground="neutral-weak">
            View my resume below or download it for offline viewing.
          </Text>
        </Flex>
        
        <Flex gap="16">
          <Button
            href="/resumes/Rashim_Resume.pdf"
            download="Rashim_Resume.pdf"
            variant="primary"
            role="link"
          >
            Download Resume
          </Button>
          <Button
            href="/resumes/Rashim_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            variant="secondary"
            role="link"
          >
            Open in New Tab
          </Button>
        </Flex>

        <Flex 
          fillWidth 
          style={{ 
            height: "80vh",
            border: "1px solid var(--neutral-border-medium)",
            borderRadius: "var(--radius-m)",
            overflow: "hidden"
          }}
        >
          <iframe
            src="/resumes/Rashim_Resume.pdf"
            width="100%"
            height="100%"
            style={{ border: "none" }}
            title="Rashim R B Resume"
          />
        </Flex>
      </Flex>
    </Column>
  );
}