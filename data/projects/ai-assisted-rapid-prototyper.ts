import type { ProjectDetail } from "./types.ts";

export const aiAssistedRapidPrototyper: ProjectDetail = {
  overview: `Developed as part of CU Boulder’s Senior Design Program in partnership with Festo, this AI-powered Rapid Prototyper automatically generates runnable application scaffolds for React and Python projects from high-level specifications. The system provides an end-to-end pipeline for uploading requirements, generating code with AI assistance, editing and running prototypes in-browser, refining generated artifacts, and exporting complete projects for downstream development.`,
  sections: [
    {
      title: "Partnership & Scope",
      paragraphs: [
        `This project was completed in partnership with Festo, an international leader in industrial automation and control systems, under CU Boulder’s Senior Design Program. Our team owned the full software development lifecycle — design, architecture, implementation, testing, and deployment — and delivered regular executive-level updates to Festo stakeholders.`,
        `While progress and deliverables were reported directly to Festo executives, all technical decisions and implementation work were performed independently by our development team. The final product was developed for a private company; as such, source code and repository access are restricted and cannot be shared publicly.`
      ]
    },
    {
      title: "Project Overview",
      paragraphs: [
        `The goal was to build an AI-assisted rapid prototyping tool that converts high-level project specifications — Epics, User Stories, and documentation — into runnable web application prototypes. Users interact via a React-based web interface to upload requirements, trigger AI-powered code generation, inspect the generated file tree, edit files in-browser, run prototypes live, iterate on outputs, and export finished projects.`,
        `The application implements a complete end-to-end pipeline: Upload → Generate → Edit/Run → Refine → Export.`
      ],
      bullets: [
        `React-based UI with file-tree preview and in-browser editor`,
        `AI-assisted generation of frontend and backend scaffolds`,
        `Live execution environment for quick validation and iteration`,
        `Exportable, runnable project bundles for further development`
      ]
    },
    {
      title: "Collaboration and Engineering Practices",
      paragraphs: [
        `Operated under industry mentorship from Festo with executive design reviews, milestone presentations, and feedback sessions to ensure professional-grade delivery.`,
        `Followed agile and DevOps methodologies — sprint planning, documentation, version control, and CI/CD pipelines — to mirror an industry software lifecycle.`
      ],
      bullets: [
        `Coordinated closely with a sister CU Boulder senior design team to ensure compatible APIs, consistent data formats, and shared deployment environments.`,
        `Produced detailed documentation covering system architecture, DevOps workflows, and deployment instructions.`
      ]
    },
    {
      title: "Technical Architecture",
      paragraphs: [
        `The system is organized into a modular frontend and server-side backend, connected via RESTful APIs and deployed to cloud infrastructure to support CI/CD.`
      ],
      bullets: [
        `Frontend: React, Vite, Redux, Tailwind CSS, React Router; Monaco Editor + StackBlitz WebContainers for in-browser code editing and live execution.`,
        `Backend: Django (Python) with AWS DynamoDB for structured data storage; OpenAI APIs for code generation and prompt orchestration.`,
        `Deployment: Frontend delivered through AWS Amplify; backend functions deployed as AWS Lambda behind API Gateway; artifacts stored in S3; CI/CD automated with GitLab pipelines.`,
        `Runtime & testing: Development and load testing performed in Azure-hosted Kubernetes clusters for backend reliability and monitoring.`
      ]
    },
    {
      title: "Challenges & Achievements",
      paragraphs: [
        `The project required solving several interdisciplinary challenges spanning AI prompt engineering, live execution in-browser, and cross-team integration.`
      ],
      bullets: [
        `AI Prompt Optimization: Designed robust prompt templates and context-passing techniques to produce consistent, valid, and reviewable code output from LLMs.`,
        `Live Execution Environment: Successfully integrated WebContainers and Monaco to create an interactive, browser-based IDE capable of running Node.js applications on the fly.`,
        `Cross-Team Integration: Achieved technical interoperability with an independent, adjacent senior design team by standardizing APIs and data formats.`,
        `Professional Lifecycle: Delivered a production-quality software package with architecture documentation, CI/CD pipelines, and deployment automation matching industry DevOps standards.`
      ]
    },
    {
      title: "Outcome & Future Directions",
      paragraphs: [
        `The system reliably generates complete, runnable web application prototypes from user-submitted specifications, significantly accelerating the early DevOps phase of project development. Proposed future enhancements for Festo include expanding language and framework support, adding AI-based validation and multi-agent refinement, and deeper integration with enterprise cloud tooling and internal Festo services.`
      ],
      bullets: [
        `Expand model support beyond React/Python to additional stacks.`,
        `Implement automated AI validation and multi-agent collaboration for iterative error checking and refinement.`,
        `Integrate with Festo internal tools and cloud environments for enterprise-scale adoption.`
      ]
    }
  ],
  artifacts: [
    "Capstone presentation deck",
    "System architecture documentation",
    "DevOps and deployment guides",
    "Private code repository (access restricted)"
  ],
  links: [
    { label: "Poster — Senior Design Final Poster (Preview / Download)", href: "/Festo/Senior%20Design%20Final%20Poster.png" },
    { label: "Presentation — Festo Sponsor Presentation (View / Download)", href: "/Festo/Festo%20Sponsor%20Presentation.pdf" },
    { label: "Documentation — Festo DevOps Documentation (View / Download)", href: "/Festo/Festo_DevOps_Documentation.pdf" }
  ]
};
