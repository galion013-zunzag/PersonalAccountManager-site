const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const videos = document.querySelectorAll("video[data-inview]");
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const video = entry.target;
        if (!(video instanceof HTMLVideoElement)) continue;
        if (entry.isIntersecting) {
          video.preload = "auto";
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    },
    { threshold: 0.45 },
  );
  videos.forEach((video) => observer.observe(video));
}
