import { Fragment } from "react";
import { Avatar, Button, Column, Heading, Line, Row, Text, SmartLink } from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import { home, person, social } from "@/app/resources/content";
import { getPosts } from "@/app/utils/utils";

export async function generateMetadata() {
  const title = "Rashim R B - Full Stack Developer";
  const description = "Full Stack Developer at Skcript specializing in TypeScript, React Native, Node.js. Building production-grade email services, mobile apps, and scalable systems. Based in Chennai.";
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
  const projects = getPosts(["src", "app", "work", "projects"])
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .filter(
      (post, index, self) =>
        index === self.findIndex((p) => p.metadata.title === post.metadata.title),
    )
    .slice(0, 3);

  const posts = getPosts(["src", "app", "blog", "posts"])
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 3);

  const year = (date) => new Date(date).getFullYear();

  return (
    <Column maxWidth="s" gap="xl" paddingY="l">
      {/* Intro */}
      <Column gap="l">
        <Row gap="20" vertical="center" wrap>
          <Avatar src={person.avatar} size="l" />
          <Column gap="4">
            <Heading variant="display-strong-s">{person.name}</Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              {home.headline}
            </Text>
          </Column>
        </Row>

        <Text variant="body-default-l" onBackground="neutral-weak" style={{ lineHeight: 1.7 }}>
          {home.summary}
        </Text>

        <Row gap="8" wrap vertical="center">
          <Button href="/resume" variant="secondary" size="s" prefixIcon="book" label="Resume" />
          {social.map((item) => (
            <Button
              key={item.name}
              href={item.link}
              variant="tertiary"
              size="s"
              prefixIcon={item.icon}
              label={item.name}
            />
          ))}
        </Row>
      </Column>

      {/* Selected work */}
      {projects.length > 0 && (
        <Column gap="m">
          <Heading as="h2" variant="heading-strong-m">
            Selected work
          </Heading>
          <Column fillWidth>
            {projects.map((post, index) => (
              <Fragment key={post.slug}>
                {index > 0 && <Line background="neutral-alpha-weak" />}
                <SmartLink fillWidth unstyled href={`/work/${post.slug}`}>
                  <Row fillWidth horizontal="space-between" vertical="center" gap="16" paddingY="12">
                    <Column gap="4">
                      <Text variant="body-strong-m" onBackground="neutral-strong">
                        {post.metadata.title}
                      </Text>
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        {post.metadata.summary}
                      </Text>
                    </Column>
                    <Text
                      variant="body-default-s"
                      onBackground="neutral-weak"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {year(post.metadata.publishedAt)}
                    </Text>
                  </Row>
                </SmartLink>
              </Fragment>
            ))}
          </Column>
          <SmartLink href="/work">
            <Text variant="body-default-s" onBackground="brand-weak">
              All projects →
            </Text>
          </SmartLink>
        </Column>
      )}

      {/* Writing */}
      {posts.length > 0 && (
        <Column gap="m">
          <Heading as="h2" variant="heading-strong-m">
            Writing
          </Heading>
          <Column fillWidth>
            {posts.map((post, index) => (
              <Fragment key={post.slug}>
                {index > 0 && <Line background="neutral-alpha-weak" />}
                <SmartLink fillWidth unstyled href={`/blog/${post.slug}`}>
                  <Row fillWidth horizontal="space-between" vertical="center" gap="16" paddingY="12">
                    <Text variant="body-default-m" onBackground="neutral-strong">
                      {post.metadata.title}
                    </Text>
                    <Text
                      variant="body-default-s"
                      onBackground="neutral-weak"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {year(post.metadata.publishedAt)}
                    </Text>
                  </Row>
                </SmartLink>
              </Fragment>
            ))}
          </Column>
          <SmartLink href="/blog">
            <Text variant="body-default-s" onBackground="brand-weak">
              All writing →
            </Text>
          </SmartLink>
        </Column>
      )}
    </Column>
  );
}
