"use client";

import { Fragment } from "react";
import { Column, Line, Row, SmartLink, Tag, Text } from "@/once-ui/components";

interface Project {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    tag?: string | string[];
    link?: string;
  };
  content: string;
}

interface ProjectsProps {
  range?: [number, number?];
  projects: Project[];
}

export function Projects({ range, projects }: ProjectsProps) {
  // Remove duplicates based on title
  const uniqueProjects = projects.reduce((acc, current) => {
    const existingProject = acc.find(
      (project) => project.metadata.title === current.metadata.title,
    );
    if (!existingProject) {
      acc.push(current);
    }
    return acc;
  }, [] as Project[]);

  const sortedProjects = uniqueProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth>
      {displayedProjects.map((post, index) => {
        const tags = Array.isArray(post.metadata.tag)
          ? post.metadata.tag
          : post.metadata.tag
            ? [post.metadata.tag]
            : [];

        return (
          <Fragment key={post.slug}>
            {index > 0 && <Line background="neutral-alpha-weak" />}
            <SmartLink fillWidth unstyled href={`/work/${post.slug}`}>
              <Row fillWidth horizontal="space-between" vertical="center" gap="24" paddingY="16">
                <Column gap="8">
                  <Text variant="body-strong-l" onBackground="neutral-strong">
                    {post.metadata.title}
                  </Text>
                  <Text variant="body-default-m" onBackground="neutral-weak">
                    {post.metadata.summary}
                  </Text>
                  {tags.length > 0 && (
                    <Row gap="8" wrap paddingTop="4">
                      {tags.map((tag) => (
                        <Tag key={tag} size="s" variant="neutral">
                          {tag}
                        </Tag>
                      ))}
                    </Row>
                  )}
                </Column>
                <Text
                  variant="body-default-s"
                  onBackground="neutral-weak"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {new Date(post.metadata.publishedAt).getFullYear()}
                </Text>
              </Row>
            </SmartLink>
          </Fragment>
        );
      })}
    </Column>
  );
}
