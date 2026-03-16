const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  },
  {
    threshold: 0.18
  }
);

document.querySelectorAll("[data-reveal]").forEach((node, index) => {
  node.style.transitionDelay = `${Math.min(index * 60, 320)}ms`;
  observer.observe(node);
});
