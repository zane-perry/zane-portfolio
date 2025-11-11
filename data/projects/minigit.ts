import type { ProjectDetail } from "./types.ts";

export const minigit: ProjectDetail = {
  overview: `Design and implementation of a lightweight version control system (VCS) implemented
from first principles to illuminate the inner workings of modern VCS tools. The project
provides a CLI that supports repository initialization, staging, commits, branching, checkout,
and merging—demonstrating snapshot storage, content-addressable objects, and revision graphs.`,
  sections: [
    {
      title: "Project Focus & Responsibilities",
      paragraphs: [
        `Led the design of the repository layout and core storage primitives. The system manages a
hidden metadata folder for history, stores file blobs by hashed contents, and records commit
metadata to form a directed acyclic graph of revisions. I implemented the CLI surface and
core APIs for hashing, object storage, the index (staging area), and commit/branch management.`
      ],
      bullets: [
        `Repository layout and hidden history folder design`,
        `CLI commands: init, add, commit, log, branch, checkout, merge`,
        `Hashing and blob/object storage APIs`,
        `Index/staging implementation and commit metadata management`,
        `Branching/merge subsystem with lowest-common-ancestor detection and conflict markers`
      ]
    },
    {
      title: "Implementation Details",
      paragraphs: [
        `Implemented in C++ using the Standard Library and filesystem APIs. The project emphasizes
modular design: a CLI layer for parsing and user interaction, a file I/O layer for blob
management, and a VCS logic layer for commit graph manipulation. Unit tests were written for
core components to validate hashing, snapshot creation, and merge behavior.`
      ]
    },
    {
      title: "Key Achievements",
      bullets: [
        `Built a functioning VCS from scratch supporting commits, branches, checkouts, and merges`,
        `Designed an extensible object store using content-addressable hashing`,
        `Implemented a usable CLI and demonstrated full workflows (feature branch → merge)`,
        `Wrote unit tests for critical primitives and used GitHub for project collaboration`
      ]
    },
    {
      title: "Technologies Used",
      bullets: [
        `C++ and the C++ Standard Library (filesystem, hashing utilities)`,
        `Custom CLI parsing and unit tests`,
        `GitHub for remote repository hosting and collaboration`
      ]
    },
    {
      title: "Outcome",
      paragraphs: [
        `The project deepened low-level understanding of distributed version control concepts
including snapshot storage, commit graphs, branching strategies, and merge conflict handling.
By implementing these features directly, the team gained practical insights into the
trade-offs and engineering decisions behind tools like Git.`
      ]
    }
  ],
  artifacts: [
    "C++ source code",
    "Command-line manual",
    "Example repositories and usage scripts"
  ],
  links: [
    { label: "GitHub — Minigit File Version Control", href: "https://github.com/zane-perry/Minigit-File-Version-Control" }
  ]
};

