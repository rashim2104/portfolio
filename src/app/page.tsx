import React from "react";
import { Column, Flex, Text, SmartLink, SmartImage } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { home, person } from "@/app/resources/content";
import { getPosts } from "@/app/utils/utils";
import { formatDate } from "@/app/utils/formatDate";

export async function generateMetadata() {
  const title = home.title;
  const description = home.description;
  const ogImage = `https://${baseURL}/og?type=default&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://${baseURL}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}`,
      images: [{ url: ogImage, alt: title }],
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
  const posts = getPosts(["src", "app", "blog", "posts"])
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 3);

  return (
    <Column maxWidth="m" gap="xl">
      {/* Overview */}
      <Flex direction="column" gap="16">
        <Text variant="heading-strong-l">Overview</Text>
        <Flex gap="32" mobileDirection="column-reverse">
          <Text variant="body-default-l" onBackground="neutral-weak" style={{ flex: 1 }}>
            {home.about}
          </Text>
          <SmartImage
            src={person.avatar}
            alt={person.name}
            aspectRatio="1 / 1"
            radius="full"
            style={{ width: "140px", height: "140px", flexShrink: 0 }}
          />
        </Flex>
      </Flex>

      {/* Interests */}
      <Flex direction="column" gap="16">
        <Text variant="heading-strong-l">Interests</Text>
        <Flex wrap gap="12">
          {home.interests.map((interest) => (
            <Flex
              key={interest.title}
              direction="column"
              gap="4"
              padding="16"
              radius="m"
              border="neutral-alpha-weak"
              style={{ flex: "1 1 200px", maxWidth: "280px" }}
            >
              <Text variant="label-strong-s">{interest.title}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {interest.description}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Writing */}
      {posts.length > 0 && (
        <Flex direction="column" gap="16">
          <Text variant="heading-strong-l">Writing</Text>
          <Flex direction="column" gap="8">
            {posts.map((post) => (
              <SmartLink key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <Flex horizontal="space-between" vertical="center" padding="12" radius="m" border="neutral-alpha-weak">
                  <Text variant="body-default-m">{post.metadata.title}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak" style={{ whiteSpace: "nowrap", marginLeft: "16px" }}>
                    {formatDate(post.metadata.publishedAt)}
                  </Text>
                </Flex>
              </SmartLink>
            ))}
          </Flex>
          <SmartLink href="/blog">
            <Text variant="body-default-s" onBackground="neutral-weak">View all</Text>
          </SmartLink>
        </Flex>
      )}
    </Column>
  );
}
