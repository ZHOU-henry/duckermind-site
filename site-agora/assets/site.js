const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        continue;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll("[data-reveal]").forEach((node, index) => {
  node.style.transitionDelay = `${Math.min(index * 70, 360)}ms`;
  revealObserver.observe(node);
});
