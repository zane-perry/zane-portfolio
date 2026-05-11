import type { ProjectDetail } from "./types.ts";

export const bayesianBlastAnalysis: ProjectDetail = {
  overview: `This individual research project developed a Bayesian reinterpretation of BLAST evidence to estimate probabilistic support for biological sequence homology and species matching. Instead of treating BLAST E-values only as null-model significance, the framework converts alignment evidence into posterior probabilities with uncertainty quantification and supports sequential evidence accumulation across genomic fragments. The project combines computational biology, Bayesian statistics, MCMC methods, and practical bioinformatics workflows.`,
  sections: [
    {
      title: "Project Context",
      paragraphs: [
        `Individual Research Project — University of Colorado Boulder`
      ]
    },
    {
      title: "Motivation and Background",
      paragraphs: [
        `BLAST is a standard tool for local sequence similarity search, but E-values do not directly answer the biologically meaningful question: what is the probability of true homology given observed evidence? This project addresses that gap by mapping BLAST-derived evidence into a Bayesian model that outputs posterior distributions for homolog-like similarity.`
      ],
      bullets: [
        `Case study 1: controlled protein mutation analysis using hemoglobin subunit beta`,
        `Case study 2: sequential genomic fragment updates for species-level matching`
      ]
    },
    {
      title: "Core Methodology",
      bullets: [
        `Analyzed BLAST scoring structure (substitution matrices, gap penalties, bit scores, E-values) for protein and nucleotide searches`,
        `Built a Bayesian evidence model using transformed BLAST E-values as continuous evidence variables`,
        `Used Beta priors to represent uncertainty in homolog probability`,
        `Specified likelihood functions over transformed BLAST evidence and derived posterior distributions`,
        `Separated posterior interpretation from classical null-model significance testing`
      ]
    },
    {
      title: "MCMC Computation",
      paragraphs: [
        `Implemented Metropolis-Hastings sampling to estimate posterior distributions numerically, producing posterior means, variances, credible intervals, and density estimates.`
      ]
    },
    {
      title: "Protein Mutation Ladder Study",
      paragraphs: [
        `Constructed synthetic mutation ladders for human hemoglobin beta (10%, 25%, 50%, and 75% amino-acid substitutions) and compared synthetic proteins plus a real chicken homolog against the original human sequence.`
      ],
      bullets: [
        `Posterior support decreased smoothly as mutation level increased`,
        `Biologically meaningful homologs still received strong posterior support despite divergence`
      ]
    },
    {
      title: "Sequential Genomic Updating",
      paragraphs: [
        `Extended the model to long genomic DNA by fragmenting the human beta-globin locus and updating posterior probabilities sequentially with additional BLAST evidence.`
      ],
      bullets: [
        `Queried fragments against human, chimpanzee, and mouse databases`,
        `Showed ambiguous early fragments can be outweighed by stronger later evidence`,
        `Generated species-specific posterior trajectories showing dynamic confidence updates`
      ]
    },
    {
      title: "Results",
      bullets: [
        `Transformed BLAST E-values into interpretable posterior probability distributions`,
        `Demonstrated monotonic degradation of posterior support with increasing mutation`,
        `Recovered biologically meaningful homologs under substantial sequence divergence`,
        `Validated sequential Bayesian updating for long genomic sequence analysis`
      ]
    },
    {
      title: "Key Contributions",
      bullets: [
        `Developed a Bayesian reinterpretation framework for BLAST-derived evidence`,
        `Integrated computational biology with Bayesian inference and MCMC sampling`,
        `Demonstrated sequential updating for genomic fragment analysis and species classification`,
        `Bridged statistical learning with classical bioinformatics alignment methods`,
        `Produced a workflow-compatible probabilistic layer beyond standard E-value interpretation`
      ]
    },
    {
      title: "Technologies and Methods",
      bullets: [
        `Python, Biopython, BLAST/NCBI databases, UniProt`,
        `Bayesian statistics, Metropolis-Hastings, Markov Chain Monte Carlo`,
        `Probabilistic modeling, computational biology, bioinformatics`,
        `Sequence alignment, NumPy, SciPy, Matplotlib, LaTeX`
      ]
    }
  ],
  links: [
    { label: "Presentation — BLAST Presentation (View / Download)", href: "/BLAST/BLAST%20Presentation.pdf" },
    { label: "Report — BLAST Report (View / Download)", href: "/BLAST/BLAST%20Report.pdf" },
    { label: "GitHub — bayesian-blast", href: "https://github.com/zane-perry/bayesian-blast" }
  ]
};
