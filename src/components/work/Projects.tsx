import { ProjectCard } from "@/components";
import styles from "@/components/work/Projects.module.css";

interface Project {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    images: string[];
    team?: { avatar: string }[];
    link?: string;
  };
  content: string;
}

interface ProjectsProps {
  range?: [number, number?];
  projects: Project[];
}

export function Projects({ range, projects }: ProjectsProps) {
  const uniqueProjects = projects.reduce((acc, current) => {
    if (!acc.some((project) => project.metadata.title === current.metadata.title)) {
      acc.push(current);
    }
    return acc;
  }, [] as Project[]);

  const sortedProjects = uniqueProjects.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime(),
  );

  const start = range ? range[0] - 1 : 0;
  const end = range ? (range[1] ?? sortedProjects.length) : sortedProjects.length;
  const displayedProjects = sortedProjects.slice(start, end);

  return (
    <div className={styles.list}>
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          ordinal={sortedProjects.length - (start + index)}
        />
      ))}
    </div>
  );
}
