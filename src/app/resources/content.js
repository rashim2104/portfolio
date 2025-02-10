import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Rashim",
  lastName: "R B",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Full Stack Developer",
  avatar: "/images/avatar1.jpg",
  location: "Chennai, Tamil Nadu",
  email: "rashimrb22@gmail.com",
  phone: "+91-8778484418",
  languages: ["English", "Tamil"], 
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
    name: "Email",
    icon: "email",
    link: "mailto:rashimrb22@gmail.com",
  },
  /* Sample social link format:
  {
    name: "X",
    icon: "x",
    link: "",
  },
  */
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Pre-final year IT engineering student with strong programming skills in Python and Java`,
  headline: <>Full Stack Developer & IT Engineering Student</>,
  subline: (
    <>
      I'm a pre-final year IT engineering student with strong programming skills and
      <br /> a passion for building scalable web solutions.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
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
        Pre-final year IT engineering student with strong programming skills in Python and Java, keen interest in
        development, and a solid foundation in web development. Experienced in applying analytical problem-solving
        skills to build scalable solutions.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Bulkpe",
        timeframe: "Jun 2024 - Dec 2024",
        role: "Full Stack Developer Intern",
        location: "Chennai, Tamil Nadu, India",
        achievements: [
          <>Redesigned Bulkpe's landing page using React.js, enhancing SEO and improving load times by 20%</>,
          <>Developed comprehensive API documentation and testing strategies, increasing reliability</>,
          <>Contributed to designing and implementing features for a Docs AI Chatbot app</>,
          <>Created and optimized email templates for marketing communications</>,
          <>Redesigned and created new blog templates, improving content presentation</>,
        ],
      },
    ],
  },
  volunteering: {
    display: true,
    title: "Leadership & Volunteering",
    experiences: [
      {
        company: "IEEE Sri Sairam Institute of Technology SB",
        timeframe: "Apr 2024 - Present",
        role: "Website Vice Lead",
        achievements: [
          <>Managed website operations and updates for the IEEE Student Branch</>,
          <>Organized Yesist12 - 2024 event and the Zenith Event funded by IEEE SPAx</>,
        ],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education",
    institutions: [
      {
        name: "Sri Sairam Institute of Technology",
        timeframe: "Oct 2022 - Present",
        description: <>Bachelor of Technology in Information Technology (GPA: 8.68)</>,
        achievements: [
          <>Developed websites for Infyra'23 symposium and Hack in Hub'23 hackathon</>
        ]
      },
      {
        name: "Sri Sankara Matric. Hr. Sec. School",
        timeframe: "Completed in 2022",
        description: <>Higher Secondary (HSC) - Computer Science (87%)</>,
      },
      {
        name: "Sri Mahadeva Guruji Matric. Hr. Sec. School",
        timeframe: "Completed in 2020",
        description: <>Secondary School (SSLC) - 97%</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical Skills",
    skills: [
      {
        title: "Languages",
        description: <>Java, C, Python, JavaScript, HTML, CSS</>,
      },
      {
        title: "Frameworks & Tools",
        description: <>Next.js, MongoDB, React.js, Node.js</>,
      },
      {
        title: "Databases",
        description: <>SQL, MongoDB</>,
      },
      {
        title: "Other Skills",
        description: <>Problem Solving, Communication, Team Leadership</>,
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

const gallery = {
  label: "Achievements",
  title: "Achievements & Recognition",
  description: "Notable achievements and contributions",
  achievements: [
    "Won 1st prize in 'Code Combat', a college-level coding competition",
    "Secured $8,632 in funding for the IEEE Tech4Good project focused on energy conservation in an old age home",
    "Contributed to the organization of events at the IEEE Student Branch"
  ],
  /* Sample gallery image format:
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
  */
};

export { person, social, newsletter, home, about, blog, work, gallery };
