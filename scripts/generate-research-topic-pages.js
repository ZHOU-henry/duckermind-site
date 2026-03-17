#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const projectRoot = path.resolve(__dirname, "..");
const dataPath = path.join(projectRoot, "site/assets/research-topic-data.js");
const scriptSource = fs.readFileSync(dataPath, "utf8");

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(scriptSource, sandbox);

const topicData = sandbox.window.researchTopicData;

const themeByProject = {
  noesis: "theme-noesis",
  peras: "theme-peras",
  autogenesis: "theme-autogenesis"
};

const titleByProject = {
  noesis: "Noesis",
  peras: "Peras",
  autogenesis: "Autogenesis"
};

const assetVersion = "20260317f";

const projectContextSections = {
  noesis: [
    {
      heading: "Program Context",
      paragraphs: [
        "Noesis is no longer just a conceptual memo stack. The current program direction is to connect political economy, institutional software, and observability into one coherent research surface.",
        "That means each topic page should be read as part of a wider move: build a language for AGI-era social and economic structure, then connect it to measurable substrate change rather than stopping at theory."
      ]
    },
    {
      heading: "Method Discipline",
      paragraphs: [
        "The observatory line should stay explicit about what is directly measured, what is proxied, and what is still inference-heavy. Noesis gains credibility by separating those layers rather than hiding them behind a single dashboard number.",
        "This is also why the six-factor observatory matters: it turns abstract arguments about AI power, concentration, and legitimacy into an inspectable research program."
      ]
    }
  ],
  peras: [
    {
      heading: "Ranking Context",
      paragraphs: [
        "Peras exists to rank AI directions by future value density, not by raw attention. The ranking system should reward real technical movement, credible buildability, and plausible commercialization while penalizing crowding, fragility, and narrative inflation.",
        "GitHub stars, open-source motion, product launches, and macro bottlenecks all belong in the same signal architecture, but they should not be treated as interchangeable."
      ]
    },
    {
      heading: "Evidence Discipline",
      paragraphs: [
        "Peras should keep high-trust and lower-trust signal lanes separate. The point is not to look exhaustive; the point is to make judgment more reusable and challengeable than generic AI feeds.",
        "That is why topic pages matter inside Peras: they accumulate explicit theses, open questions, and revision pressure instead of hiding ranking logic inside one opaque score."
      ]
    }
  ],
  autogenesis: [
    {
      heading: "Frontier Context",
      paragraphs: [
        "Autogenesis should begin from measurable AI-improves-AI loops rather than grand recursive-self-improvement mythology. The frontier has shifted toward evaluator loops, post-training stacks, agentic coding, and search-guided system improvement.",
        "That framing keeps the project grounded in systems that can actually be benchmarked, observed, and governed."
      ]
    },
    {
      heading: "Control Context",
      paragraphs: [
        "The project’s hard problem is not only how to produce better candidates, but how to decide when a candidate deserves promotion into an active system. Logging, rollback, verifier trust, and policy gates are therefore part of the research core, not an afterthought.",
        "In practice, this means every topic page in Autogenesis should be read through a control-loop lens: what improves, how it is tested, and who is allowed to promote it."
      ]
    }
  ]
};

const topicSections = {
  noesis: {
    "class-ai-economics": [
      {
        heading: "Why this class matters now",
        paragraphs: [
          "The current AI economy is no longer well described by generic productivity rhetoric. Infrastructure concentration, labor exposure, regional asymmetry, and the institutional consequences of compute and energy concentration are all becoming visible enough to track directly.",
          "That is why Noesis treats AI economics as a substrate problem: who controls the six factors often matters more than who writes the loudest public narrative."
        ]
      },
      {
        heading: "What Noesis should add",
        paragraphs: [
          "Noesis can contribute by linking those substrate shifts to legitimacy and coordination questions. It should not stop at market-share description; it should ask what kinds of institutions remain necessary when productive capability becomes machine-heavy and unevenly distributed.",
          "The observatory line is the bridge here. It gives the project a way to turn macro claims into inspectable indicators and then connect those indicators back to governance design."
        ]
      }
    ],
    "class-substrate-observability": [
      {
        heading: "From memo to instrument",
        paragraphs: [
          "Substrate observability matters because without a measurement layer, Noesis risks staying at the level of elegant synthesis. Public systems such as OpenAlex, GH Archive, and electricity observability platforms show that at least part of the underlying AI economy is already measurable.",
          "The point is not to pretend every hidden variable can be observed immediately. The point is to make the measurable layer explicit enough that theory has to answer to evidence."
        ]
      }
    ],
    "question-bottleneck-factors": [
      {
        heading: "Why bottlenecks are strategic",
        paragraphs: [
          "The six-factor framework only becomes strategically useful when it can identify the factor that binds first. In one period that may be training compute, in another energy interconnection, in another frontier talent clustering or data-governance friction.",
          "Bottlenecks matter because they reshape both market structure and institutional leverage. The actor who controls the first hard constraint often controls the next phase of expansion."
        ]
      }
    ],
    "formula-observatory-index": [
      {
        heading: "What the formula is for",
        paragraphs: [
          "The observatory index is not a causal proof engine. It is a disciplined first frame for comparing regional capability surfaces while keeping room for bottleneck penalties and uneven factor quality.",
          "In practice, its value is diagnostic. It helps separate regions that look strong because of one loud variable from regions that are broadly resilient across the six-factor stack."
        ]
      }
    ],
    "plan-observatory-layer": [
      {
        heading: "What this plan should deliver",
        paragraphs: [
          "This plan should turn the six-factor line into a real research product: explicit indicators, time slices, ranking logic, and narrative memos that explain why a region moves.",
          "If it works, the observatory becomes the place where Noesis can test political-economy claims against visible shifts in compute, energy, data, storage, algorithms, and talent."
        ]
      }
    ]
  },
  peras: {
    "class-infra-macro": [
      {
        heading: "Why substrate awareness changes ranking",
        paragraphs: [
          "A direction can look strong in model demos and still fail because the infrastructure map moves against it. Compute availability, power access, capex concentration, and deployment economics all change which directions are actually buildable and defensible.",
          "Peras therefore needs substrate-aware ranking logic. A purely model-centric score would miss some of the most durable value layers in the AI economy."
        ]
      }
    ],
    "question-signal-weighting": [
      {
        heading: "Why weighting is the real product question",
        paragraphs: [
          "Different directions mature under different evidence conditions. A research-heavy lane, an infrastructure lane, and a product lane should not all be scored by the same coefficient mix.",
          "Signal weighting is where Peras either becomes a useful judgment engine or collapses into a decorated feed. The weighting system determines whether the ranking is genuinely explanatory or only cosmetically quantitative."
        ]
      }
    ],
    "formula-direction-score": [
      {
        heading: "How the score should be read",
        paragraphs: [
          "DirectionScore is not meant to hide uncertainty. Its purpose is to force Peras to declare which kinds of signal it rewards and which pathologies it penalizes.",
          "The most important next step is not pretending the coefficients are settled. It is making the score category-aware and historically testable so the logic can be challenged and improved."
        ]
      }
    ],
    "direction-agentic-coding-economy": [
      {
        heading: "Why this direction stays near the top",
        paragraphs: [
          "Agentic coding has one of the clearest research-to-product transfer loops in the current AI market. Capability gains can show up quickly in benchmark scores, developer workflow compression, enterprise experimentation, and open-source architecture changes.",
          "That is also why this direction should not be judged by hype alone. The decisive questions are reliability, task closure, repo interaction quality, and whether the system can sustain full end-to-end execution under real constraints."
        ]
      }
    ],
    "direction-compute-energy-infra": [
      {
        heading: "Why this direction is strategic",
        paragraphs: [
          "Infrastructure strategy is not a background condition anymore. It increasingly determines which application and model categories can scale, what the cost curve looks like, and where national or corporate advantage compounds.",
          "Peras should keep this lane visible because value can accumulate where others still see only capex and utility constraints."
        ]
      }
    ]
  },
  autogenesis: {
    "class-evolutionary-search": [
      {
        heading: "Why DeepMind’s line matters",
        paragraphs: [
          "AlphaEvolve, AlphaDev, and FunSearch matter because they show bounded, domain-specific self-improvement dynamics rather than vague recursive mythology. Search, evaluators, and reward structure become concrete mechanisms instead of science-fiction placeholders.",
          "That makes this class a crucial bridge between frontier practice and a serious AI4AI research program."
        ]
      }
    ],
    "class-agentic-coding": [
      {
        heading: "Why software is the first benchmark environment",
        paragraphs: [
          "Agentic coding turns improvement into something that can be measured against tests, issue resolution, repo state, and task completion. It is one of the best available environments for studying how AI systems iteratively improve technical artifacts.",
          "For Autogenesis, that makes software engineering more than an application niche; it is a controllable laboratory for recursive loop design."
        ]
      }
    ],
    "question-improvable-loops": [
      {
        heading: "Why loop selection matters",
        paragraphs: [
          "Not every loop that sounds recursive is worth building. Some loops mostly amplify noise, evaluator bias, or operational complexity instead of creating meaningful gains.",
          "Autogenesis should therefore classify loops by observable improvement structure: what changes, how success is measured, and where failure cascades are likely to appear."
        ]
      }
    ],
    "formula-promotion-gate": [
      {
        heading: "Why promotion is different from generation",
        paragraphs: [
          "Candidate generation is cheap compared with safe promotion. The promotion gate exists to force every candidate through a gain, reliability, and risk check before it becomes the new default inside a loop.",
          "That makes this formula less about mathematical elegance and more about governance posture: who is allowed to trust a local win enough to turn it into system state."
        ]
      }
    ],
    "plan-map-loop-classes": [
      {
        heading: "What this plan should produce",
        paragraphs: [
          "This plan should give Autogenesis a concrete taxonomy of loop types instead of one blurred AI-improves-AI slogan. Code loops, evaluator loops, post-training loops, and search loops behave differently and need different benchmarks.",
          "Once that taxonomy exists, the project can rank loop classes by practical frontier relevance and choose where to build first."
        ]
      }
    ]
  }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderTopicPage(project, slug, topic) {
  const projectTitle = titleByProject[project];
  const sections = [
    ...(topicSections[project]?.[slug] || []),
    ...(projectContextSections[project] || []),
  ];
  const cards = topic.cards
    .map(
      (card) => `
        <article class="story-card" data-reveal>
          <span class="panel-label">${escapeHtml(card.label)}</span>
          <h3 class="card-title">${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.text)}</p>
        </article>
      `
    )
    .join("");

  const sources = (topic.sources || [])
    .map((source) => `<span class="tag">${escapeHtml(source)}</span>`)
    .join("");

  const richSections = sections
    .map(
      (section) => `
        <section class="topic-doc-section">
          <span class="section-kicker">${escapeHtml(section.heading)}</span>
          ${section.paragraphs
            .map((paragraph) => `<p class="section-note">${escapeHtml(paragraph)}</p>`)
            .join("")}
        </section>
      `
    )
    .join("");

  const formulaSection = topic.formula
    ? `
      <section class="section">
        <div class="table-panel" data-reveal>
          <span class="section-kicker">Core Formula</span>
          <h2 class="card-title">Key frame</h2>
          <span class="formula-line">${escapeHtml(topic.formula)}</span>
        </div>
      </section>
    `
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(topic.title)} | Duckermind</title>
    <meta name="description" content="${escapeHtml(topic.lede)}" />
    <link rel="stylesheet" href="/assets/styles.css?v=${assetVersion}" />
    <script defer src="/assets/site.js?v=${assetVersion}"></script>
  </head>
  <body class="${themeByProject[project]}">
    <div class="page-shell">
      <header class="topbar">
        <div class="topbar-inner">
          <a class="brand" href="/">
            <span class="brand-mark" aria-hidden="true"></span>
            <span class="brand-copy">
              <strong>Duckermind</strong>
              <span>${escapeHtml(projectTitle)} Topic</span>
            </span>
          </a>
          <div class="header-stack">
            <nav class="nav">
              <a href="/">Home</a>
              <a href="/projects/${project}/">${escapeHtml(projectTitle)}</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </div>
      </header>
      <main class="content">
        <section class="section">
          <div class="topic-doc-grid">
            <article class="topic-doc-main" data-reveal>
              <div class="topic-doc-header">
                <span class="eyebrow">${escapeHtml(topic.eyebrow)}</span>
                <h1>${escapeHtml(topic.title)}</h1>
                <p class="section-note">${escapeHtml(topic.lede)}</p>
              </div>
              <div class="topic-doc-actions">
                <a class="button" href="/projects/${project}/">Back to ${escapeHtml(projectTitle)}</a>
                <a class="button-secondary" href="/projects/${project}/research-agenda/">Research Agenda</a>
              </div>
              <div class="topic-doc-section">
                <div class="story-grid">${cards}</div>
              </div>
              ${richSections}
            </article>
            <aside class="topic-doc-side" data-reveal>
              <span class="section-kicker">Source Anchors</span>
              <h2 class="card-title">Primary references</h2>
              <div class="tag-row">${sources}</div>
              <div class="topic-doc-section">
                <span class="section-kicker">Reading Mode</span>
                <p class="section-note">These pages are intentionally denser and more document-like than the main Duckermind landing pages.</p>
              </div>
            </aside>
          </div>
        </section>
        ${formulaSection}
        <section class="section" id="contact">
          <div class="contact-band" data-reveal>
            <div class="contact-grid">
              <div>
                <span class="section-kicker">Contact Us</span>
                <h2 class="card-title">Talk to Duckermind about ${escapeHtml(projectTitle)}.</h2>
                <p class="section-note">Research, strategy, and project collaboration.</p>
              </div>
              <div class="button-row">
                <a class="button" href="mailto:zhouzehao2018@163.com">zhouzehao2018@163.com</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </body>
</html>
`;
}

for (const [project, topics] of Object.entries(topicData)) {
  for (const [slug, topic] of Object.entries(topics)) {
    const outDir = path.join(projectRoot, "site/projects", project, "topics", slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), renderTopicPage(project, slug, topic));
  }
}
