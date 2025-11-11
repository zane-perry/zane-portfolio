export type ProjectSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type ProjectDetail = {
  overview: string;
  sections?: ProjectSection[];
  artifacts?: string[];
  links?: Array<{ label: string; href: string }>;
};
