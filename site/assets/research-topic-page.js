(function () {
  const root = document.querySelector("[data-research-topic-page]");
  if (!root) return;

  const project = root.dataset.project;
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const topics = window.researchTopicData && window.researchTopicData[project];
  const topic = topics && slug ? topics[slug] : null;

  const titleNode = root.querySelector("[data-topic-title]");
  const eyebrowNode = root.querySelector("[data-topic-eyebrow]");
  const ledeNode = root.querySelector("[data-topic-lede]");
  const cardsNode = root.querySelector("[data-topic-cards]");
  const formulaWrap = root.querySelector("[data-topic-formula-wrap]");
  const formulaNode = root.querySelector("[data-topic-formula]");
  const sourcesNode = root.querySelector("[data-topic-sources]");

  if (!topic) {
    titleNode.textContent = "Topic not found";
    eyebrowNode.textContent = "Research Topic";
    ledeNode.textContent = "The requested topic slug is missing.";
    cardsNode.innerHTML = "";
    formulaWrap.hidden = true;
    sourcesNode.innerHTML = "";
    return;
  }

  document.title = `${topic.title} | Duckermind`;
  titleNode.textContent = topic.title;
  eyebrowNode.textContent = topic.eyebrow;
  ledeNode.textContent = topic.lede;

  cardsNode.innerHTML = topic.cards
    .map(
      (card) => `
        <article class="story-card" data-reveal>
          <span class="panel-label">${card.label}</span>
          <h3 class="card-title">${card.title}</h3>
          <p>${card.text}</p>
        </article>
      `
    )
    .join("");

  if (topic.formula) {
    formulaWrap.hidden = false;
    formulaNode.textContent = topic.formula;
  } else {
    formulaWrap.hidden = true;
  }

  sourcesNode.innerHTML = (topic.sources || [])
    .map((source) => `<span class="tag">${source}</span>`)
    .join("");
})();
