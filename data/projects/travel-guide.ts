import type { ProjectDetail } from "./types.ts";

export const travelGuide: ProjectDetail = {
  overview: `Team-based full-stack web application built during CSCI 3308. The project covered the full software lifecycle — concept, design, implementation, testing, and deployment — and followed industry-level practices for collaboration, version control, and agile development. The app is a travel itinerary planner that aggregates points of interest, supports route optimization heuristics, and offers shareable schedules with collaborative editing.`,
  sections: [
    {
      title: "Roles & Responsibilities",
      paragraphs: [
        `Served as a core contributor in a semester-long team project. Responsibilities included
feature planning, sprint definitions, task tracking, front-end component design and
implementation (UI wireframes, routing, interaction flows), back-end API endpoints,
database schema design, and containerization for consistent development environments.`
      ],
      bullets: [
        `Feature planning, sprint management, and peer code reviews`,
        `Front-end: UI components, routing, responsive layouts`,
        `Back-end: RESTful endpoints, business logic, and data validation`,
        `Database: schema design and persistence`,
        `DevOps: Docker-based containerization and local orchestration`,
        `Version control: Git/GitHub workflows and branch management`
      ]
    },
    {
      title: "Key Highlights",
      bullets: [
        `Delivered a fully functioning full-stack application meeting UI, backend, and DB requirements`,
        `Applied agile methodology with iterative development, stand-ups, and retrospectives`,
        `Demonstrated container-based deployment readiness (Docker)`,
        `Integrated front-to-back connectivity: UI → API → database transactions`,
        `Collaborated effectively with teammates on commits, code reviews, and merge workflows`
      ]
    },
    {
      title: "Technologies Used",
      bullets: [
        `Front-end: HTML, CSS, JavaScript`,
        `Back-end: Node.js / Express (or equivalent middleware)`,
        `Database: Relational SQL database with designed schema`,
        `Deployment: Docker for containerization`,
        `Version control: Git/GitHub`,
        `Development workflow: Agile & sprint tracking`
      ]
    },
    {
      title: "Outcome",
      paragraphs: [
        `The project provided hands-on experience with end-to-end application development and
team collaboration. It reinforced software engineering best practices — modular design,
API layering, database integrity, containerized environments, and disciplined version
control — preparing the team for industry-style workflows.`
      ]
    }
  ],
  artifacts: [
    "Source repository",
    "API collection and documentation",
    "Sprint artifacts (meeting logs, retrospectives, wireframes)",
    "Demo walkthrough"
  ],
  links: [
    { label: "GitHub — CSCI-3308 Group 5 Project", href: "https://github.com/owal7428/CSCI-3308-Group-5-Project" }
  ]
};

