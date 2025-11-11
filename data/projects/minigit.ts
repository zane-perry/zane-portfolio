import type { ProjectDetail } from "./types.ts";

export const minigit: ProjectDetail = {
  overview: `A minimal version control system that demonstrates core primitives such as
content‑addressable storage, commits, and a simple staging workflow. Useful for understanding how
tools like Git are structured internally.`,
  sections: [
    {
      title: "Capabilities",
      bullets: [
        "Init, add, commit, and log",
        "Object storage by hash",
        "Basic branching model"
      ]
    }
  ],
  artifacts: [
    "Command reference",
    "C/C++ source code",
    "Example repositories"
  ]
};
