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

if (window.matchMedia("(pointer: fine)").matches) {
  const root = document.documentElement;
  let frame = null;

  window.addEventListener("pointermove", (event) => {
    if (frame !== null) {
      cancelAnimationFrame(frame);
    }

    frame = requestAnimationFrame(() => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
    });
  });
}
