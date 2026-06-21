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
  title: person.name,
  description: `Software Developer from ${person.location}, building backend systems and mobile apps at Skcript`,
  headline: <>Software Developer — mostly backend, sometimes mobile, always shipping</>,
  tagline: "better late than never",
  intro: <>
    I'm a software developer at <strong>Skcript</strong>, mostly building the quiet stuff that runs in
    the background. You know the password-reset email Instagram sends you? Someone has to build the thing
    that renders and ships millions of those — that's my kind of work. Built Skcript's email service from
    scratch (<strong>500K+ jobs, zero failed deliveries</strong>), and shipped <strong>FeatureOS Mobile</strong> end-to-end
    with React Native.
  </>,
  stack: [
    "TypeScript",
    "React",
    "React Native",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
  ],
  about: <>Hey, I'm Rashim. Curious, a little all over the place, and someone who can't stop building things.
    <br /><br />
    I think in visuals, figure things out as I go, and get weirdly obsessed with problems that don't have easy answers. I'm a night owl, a team player, and someone who believes the best solutions are usually the simplest ones.
    <br /><br />
    Outside of work: badminton, A.R. Rahman on loop, the occasional Lego set, and slowly getting into reading. Math has always been my thing, even if I never made it to the olympiad.
    <br /><br />
    If any of that resonates, hey, let's talk.
  </>,
  interests: [
    {
      title: "Building",
      description: "software, systems, side projects. if it can be built, i want to build it.",
    },
    {
      title: "Music",
      description: "something chill always playing — a.r. rahman to indie. it never really stops.",
    },
    {
      title: "Badminton",
      description: "been too long. gotta get back on the court.",
    },
    {
      title: "Legos",
      description: "right now it's the ferrari sf24. calm to build, real result at the end.",
    },
    {
      title: "Math",
      description: "always had a thing for it. trigonometry laws are underrated.",
    },
    {
      title: "Games",
      description: "valorant, rdr2, the occasional pubg night.",
    },
  ],
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
        <p style={{ margin: 0 }}>
          I grew up in Kodavasal, a small village in Thiruvarur, and somewhere along the way got completely
          hooked on tech. Wrote my first lines of code in grade 8 — a school program run with Bharathidasan
          University — and never really stopped. Back then I genuinely dreamt of working at Google someday.
          Still do, honestly.
        </p>
        <p style={{ margin: 0 }}>
          Everything after that was self-taught and curiosity-led. I think in visuals, figure things out as I
          go instead of planning every step, and get pulled toward hard problems that don't have clean answers.
          I'm quiet until I actually know you — then I don't really shut up. Night owl, team player, dedicated
          to a fault.
        </p>
        <p style={{ margin: 0 }}>
          These days I'm a Software Developer at Skcript, building things that quietly run in production. The
          work I love most is where I can look at the code and visually trace the whole flow of execution —
          clean, simple, where you can see exactly how it's all wired. My mentor here, Varun, never just hands
          me the answer; he asks questions back until I find it myself. That changed how I think.
        </p>
        <p style={{ margin: 0 }}>
          Outside work: badminton (need to get back to it), A.R. Rahman and a lot of chill music, the occasional
          Lego set, math, and slowly getting into reading. If any of this resonates, let's talk.
        </p>
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
          <>Built Skcript's email and notification service from scratch — pulled it out of a legacy Ruby system so every product routes through one place.</>,
          <>It's handled 500K+ jobs in six months with zero failed deliveries. Redis queues, Postgres transactions, and a 3-try retry path keep it honest.</>,
          <>Added pixel-based open tracking and URL shortening, so the dashboards show who opened and clicked in near real time.</>,
          <>The pipeline behind it logs every step of an email's lifecycle, so nothing disappears silently under load.</>,
          <>Shipped FeatureOS Mobile end to end with React Native + Expo — changelogs, roadmap boards, voting, and a searchable knowledge base in one app.</>,
          <>Wired in Apple Sign-In, Sentry, and React Query for typed APIs and caching across iOS and Android.</>,
        ],
      },
    ],
  },
  volunteering: {
    display: false,
    title: "Leadership & Volunteering",
    experiences: [
      {
        company: "",
        timeframe: "",
        role: "",
        achievements: [],
      },
    ],
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
  title: "Writing",
  description: "Notes on what I'm building, and what breaks along the way."
};

const now = {
  label: "Now",
  title: "Now",
  description: `What ${person.name} is focused on right now`,
  updated: "June 2026",
  sections: [
    {
      title: "Building",
      items: [
        "Shipping SupportWire across iOS, Android, and web — including Kal, the AI agent inside it.",
        "Keeping Skcript's email service healthy as it crosses 500K+ jobs.",
        "Quietly itching to rebuild project-z, my voice agent, the right way this time.",
      ],
    },
    {
      title: "Learning",
      items: [
        "Going back to fundamentals — I can ship fast, but I want the deep mental model, not just the framework surface.",
        "Writing tests properly instead of shipping on vibes (work in progress, no shame).",
      ],
    },
    {
      title: "Away from the screen",
      items: [
        "Reading The Algorithm.",
        "A.R. Rahman and a lot of chill music on loop.",
        "Trying to get back on the badminton court. And the occasional Valorant / RDR2 night.",
      ],
    },
  ],
};

const uses = {
  label: "Uses",
  title: "Uses",
  description: `The hardware, tools, and stack ${person.name} uses day to day`,
  intro: "The gear and software I actually reach for every day. Updated as things change.",
  groups: [
    {
      title: "Hardware",
      items: [
        { name: "MacBook Air (M4)", detail: "daily driver" },
        { name: "ASUS TUF", detail: "Intel i5 9th gen · 16GB · GTX 1650 — gaming + Windows" },
        { name: "BenQ GW2790Q", detail: "1440p display" },
        { name: "Aula F75", detail: "mechanical keyboard" },
        { name: "Logitech M720", detail: "mouse" },
      ],
    },
    {
      title: "Editor & terminal",
      items: [
        { name: "Claude Code", detail: "primary driver — builds, reviews, multi-agent work" },
        { name: "zsh", detail: "shell of choice" },
        { name: "git + gh", detail: "CLI all the way" },
      ],
    },
    {
      title: "Stack",
      items: [
        { name: "TypeScript", detail: "the language I live in" },
        { name: "Next.js · Hono · Express · SvelteKit", detail: "web frameworks" },
        { name: "Drizzle · BullMQ · LiveKit", detail: "data, queues, realtime" },
        { name: "Bun", detail: "runtime + package manager (never npm)" },
        { name: "PostgreSQL · MongoDB", detail: "databases" },
      ],
    },
    {
      title: "Infra",
      items: [
        { name: "Docker · Caddy", detail: "containers + reverse proxy" },
        { name: "Hetzner · Vercel · Cloudflare", detail: "where things run" },
        { name: "Cloudflare R2 · AWS S3", detail: "object storage" },
      ],
    },
  ],
};

const work = {
  label: "Projects",
  title: "Projects",
  description: "Things I've built — at work, in college, and on weekends.",
};

const resume = {
  label: "Resume",
  title: "Resume",
  description: "View and download my professional resume",
};

export { person, social, newsletter, home, about, blog, now, uses, work, resume };
