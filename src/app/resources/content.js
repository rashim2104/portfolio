import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Rashim",
  lastName: "R B",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Software Developer",
  avatar: "/images/avatar.jpg",
  location: "Chennai, Tamil Nadu",
  email: "hello@rashim.in",
  phone: "+91-8778484418",
};

const newsletter = {
  display: false, // Disabled newsletter subscription
  title: "Subscribe to the newsletter",
  description: "Get notified about new blog posts and updates"
};

const social = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/rashim2104",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://linkedin.com/in/rashimraseethali",
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/rashimbuilds",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:hello@rashim.in",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Software Developer & IT Engineering Student from ${person.location}`,
  headline: <>Software Developer & IT Engineering Student</>,
  about: <>Hey, I'm Rashim. Nerdy, a little ADHD, and genuinely kind (or so I'm told).
    <br /><br />
    I think in visuals, figure things out as I go, and get weirdly obsessed with problems that don't have easy answers. I'm a night owl, a team player, and someone who believes the best solutions are usually the simplest ones.
    <br /><br />
    Outside of work: badminton, A.R. Rahman on loop, the occasional Lego set, and slowly getting into reading. Math has always been my thing, even if I never made it to the olympiad.
    <br /><br />
    Integrity and honesty matter to me more than almost anything. If we vibe on that, let's talk.
  </>
};

const about = {
  label: "About",
  title: "About Me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I'm someone who thinks visually, moves fast, and cares a lot: about the work, about the people around me, and about keeping things simple. I get pulled toward hard problems, thrive in teams, and tend to figure things out as I go rather than planning every step upfront. Dedicated to a fault, probably ADHD, and genuinely kind.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Skcript",
        timeframe: "Apr 2025 – Present",
        role: "Software Developer",
        location: "Chennai, Tamil Nadu, India",
        achievements: [
          <>Independently architected and built a standalone, production-grade email and notification service, decoupled from a legacy Ruby system to enable reuse across multiple products.</>,
          <>Processed 500K+ email jobs in the last 6 months with zero failures for completed deliveries, using Redis-backed queues, PostgreSQL transactions, and retry mechanisms (3 retries).</>,
          <>Designed and implemented pixel-based open tracking and URL shortening for click analytics, enabling real-time engagement insights through interactive dashboards.</>,
          <>Built a scalable job processing pipeline capable of handling high request volumes with strict logging guarantees, tracking every lifecycle event of an email job.</>,
          <>Developed FeatureOS Mobile end-to-end using React Native + Expo, delivering a complete production-ready app including changelogs, roadmap boards, voting system, and searchable knowledge base.</>,
          <>Integrated Apple Sign-In, Sentry error monitoring, and React Query for type-safe APIs, caching, and performant data fetching across iOS and Android.</>,
        ],
      },
    ],
  },
  volunteering: {
    display: false,
    title: "Leadership & Volunteering",
    experiences: [],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Sri Sairam Institute of Technology",
        timeframe: "Oct 2022 – May 2026",
        description: <>Bachelor of Technology in Information Technology (CGPA: 8.59/10.0)</>,
      },
      {
        name: "Sri Sankara Matric. Hr. Sec. School",
        timeframe: "Completed 2022",
        description: <>Higher Secondary Certificate (HSC), Computer Science (87%)</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Programming Languages",
        description: <>TypeScript, JavaScript, Java, Python, C, HTML5, CSS3</>,
      },
      {
        title: "Frontend",
        description: <>React.js, Next.js, React Native, Expo, NativeWind, TailwindCSS</>,
      },
      {
        title: "Backend",
        description: <>Node.js, Express.js, REST APIs, GraphQL, SMTP Protocols</>,
      },
      {
        title: "Databases & Caching",
        description: <>PostgreSQL, MongoDB, Redis, Drizzle ORM, Mongoose</>,
      },
      {
        title: "DevOps & Tools",
        description: <>Docker, Docker Compose, Git, GitHub Actions, Sentry, AWS (S3, EC2)</>,
      },
      {
        title: "Libraries & Frameworks",
        description: <>React Query, Zod, React Hook Form, Highcharts, OAuth</>,
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Technical Blog",
  description: "Articles about software development, engineering, and technology"
};

const work = {
  label: "Projects",
  title: "Featured Projects",
  description: "A collection of my technical projects and achievements",
};

const resume = {
  label: "Resume",
  title: "Resume",
  description: "View and download my professional resume",
};

export { person, social, newsletter, home, about, blog, work, resume };
