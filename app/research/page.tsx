export default function ResearchPage() {
  return (
    <div className="section">
      <h1 className="section-title">Research</h1>
      <p className="section-subtitle">
        High-level overview of my current research work.
      </p>

      <div className="space-y-4">
        <section className="card">
          <h2 className="text-lg font-semibold">
            Hybrid Mechanistic Machine Learning Models for Genetic Circuits
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Ongoing research in the Genetic Logic Lab (CU Electrical Engineering).
            I&apos;m exploring ways to combine ODE-based mechanistic models with
            machine learning correction terms to better predict genetic circuit
            behavior, with an emphasis on interpretability and modular model
            design.
          </p>
          <ul className="mt-3 text-sm text-slate-700 list-disc pl-5">
            <li>
              Automatic construction of reaction-based ODE models from SBOL-style
              part lists (promoters, repressors, RBSs, etc.), enabling rapid
              circuit assembly into mechanistic backends.
            </li>
            <li>
              Modular solver backend (drop-in deterministic, stochastic, or
              future agent-based solvers) so the higher-level learning and
              training pipeline remain unchanged.
            </li>
            <li>
              Neural correction networks (residual architectures and PINN-style
              losses) that learn compact correction terms and highlight where
              mechanistic assumptions fail — surfacing missing interactions or
              context-dependent effects for interpretability.
            </li>
            <li>
              Use of differentiable ODE solvers and physics-informed loss
              functions to lower data needs while preserving mechanistic
              structure and interpretability.
            </li>
            <li>
              A scalable Python prototype for data ingestion, automatic model
              construction, and training of circuit-specific hybrid models to
              support predictive simulation and iterative design.
            </li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold">
            Synbiohub 2 & Synbiohub 3 - Software development
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Contributed to Synbiohub tooling and integrations: building API
            features, improving user tooling for genetic circuit sharing, and
            maintaining deployment scripts. Placeholder entry — add links or
            details later.
          </p>
          <ul className="mt-2 text-sm text-slate-700 list-disc pl-5">
            <li>
              Led a modular redesign of SynBioHub's plugin architecture,
              creating a customizable framework that cleanly separates
              frontend and backend concerns for visualization, submission, and
              download plugins. New plugin types can be added through
              standardized REST API endpoints so repository behavior can be
              tailored to research workflows.
            </li>
            <li>
              Transitioned the project from isolated plugin refactoring to a
              full-stack redesign that improved maintainability, scalability,
              and runtime performance across both frontend and backend
              systems.
            </li>
            <li>
              Contributed to SynBioHub 2 (frontend rewrite) and SynBioHub 3
              (backend rewrite) — parallel initiatives to rebuild the system
              using modern frameworks (React, Next.js, Spring Boot, Docker,
              and RESTful APIs) while keeping compatibility with the SBOL
              standard.
            </li>
            <li>
              Improved usability and performance for biologists with a fully
              interactive React UI featuring dynamic file submission, faceted
              search, customizable visualization panels, and spreadsheet-style
              search result presentation.
            </li>
            <li>
              Promoted FAIR data standards by designing integrations with
              external Genetic Design Automation (GDA) tools (e.g., Cello,
              SBOLCanvas, VisBOL) to enhance cross-platform interoperability
              and collaboration.
            </li>
            <li>
              Implemented CI/CD pipelines using GitHub Actions and Docker for
              automated testing, image creation, and release management,
              ensuring persistent data handling via Docker volumes and
              seamless deployment of new builds.
            </li>
            <li>
              Deployed and monitored SynBioHub instances on Azure and
              Kubernetes clusters, setting up container orchestration,
              persistent volume management, and health monitoring for
              production-level performance across multiple servers. Implemented
              logging and resource monitoring pipelines to diagnose and
              maintain long-term system stability.
            </li>
            <li>
              Collaborated across institutions (CU Boulder and University of
              Utah) under Dr. Chris Myers and co-authored an ACS Synthetic
              Biology publication as part of the SynBioHub development team.
            </li>
            <li>
              Currently mentoring an undergraduate researcher—teaching core
              software engineering practices, version control, and plugin
              design principles to foster continuity and skill development in
              the lab.
            </li>
            <li>
              Long-term focus: complete migration from legacy architecture to
              a modular, scalable SynBioHub 3 platform with improved backend
              performance (Java Spring), stronger authentication/group
              sharing, and advanced data curation tools.
            </li>
          </ul>
        </section>

        <section className="card">
          <h2 className="text-lg font-semibold">
            Other Directions &amp; Interests
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Boundary integral equation methods, PDEs for physical systems, stochastic differential equations,
            improved mathematical modeling, and advanced deep learning techniques.
          </p>
          <div className="mt-4">
            <h3 className="font-semibold">Genetic Logic Lab</h3>
            <p className="mt-2 text-sm text-slate-700">
              For more about the lab and group research, visit the Genetic Logic Lab at CU Electrical Engineering.
            </p>
            <div className="mt-3">
              <a
                href="https://geneticlogiclab.org/"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                geneticlogiclab.org
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
