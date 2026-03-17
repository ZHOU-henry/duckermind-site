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

const imageByProject = {
  noesis: "/assets/images/circuit-board.jpg",
  peras: "/assets/images/matrix-art.jpg",
  autogenesis: "/assets/images/future-city.jpg"
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
  const image = imageByProject[project];
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
    <link rel="stylesheet" href="/assets/styles.css?v=20260317b" />
    <script defer src="/assets/site.js?v=20260317b"></script>
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
        <section class="hero hero-home">
          <article class="panel hero-copy-block" data-reveal>
            <div class="quick-intro">
              <span class="eyebrow">${escapeHtml(topic.eyebrow)}</span>
              <h1 class="hero-title">${escapeHtml(topic.title)}</h1>
              <p class="hero-lede">${escapeHtml(topic.lede)}</p>
            </div>
            <div class="button-row">
              <a class="button" href="/projects/${project}/">Back to ${escapeHtml(projectTitle)}</a>
              <a class="button-secondary" href="/projects/${project}/research-agenda/">Research Agenda</a>
            </div>
          </article>
          <aside class="hero-visual visual-card" data-reveal>
            <div class="hero-visual-shell">
              <div class="visual-card-image">
                <img src="${image}" alt="${escapeHtml(projectTitle)} topic image" loading="eager" />
              </div>
              <div class="hero-visual-copy">
                <span class="panel-label">Sources</span>
                <div class="tag-row">${sources}</div>
              </div>
            </div>
          </aside>
        </section>
        <section class="section">
          <div class="story-grid">${cards}</div>
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
