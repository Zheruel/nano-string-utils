import "./styles/main.css";
import "./styles/examples.css";
import "./styles/migration.css";
import "./styles/migration-panels.css";
import "./styles/bundle-size.css";
import "./styles/performance.css";
import { initPlayground } from "./playground";
import { initSearch } from "./search";
import { initExamples } from "./examples";
import { initMigrationGuide } from "./migration";
import { initBundleSizeViewer } from "./bundle-size";
import { initPerformanceViewer } from "./performance";

document.addEventListener("DOMContentLoaded", () => {
  initPlayground();
  initSearch();
  initExamples();
  initMigrationGuide();
  initBundleSizeViewer();
  initPerformanceViewer();
  initNavigation();
});

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll(
    ".playground-section, .examples-section, .migration-section, .bundle-size-section, .performance-section"
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("href")?.substring(1);

      // Update active nav
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Update active section
      sections.forEach((s) => s.classList.remove("active"));
      const targetSection = document.getElementById(target!);

      if (targetSection) {
        targetSection.classList.add("active");

        // Re-highlight code blocks when section becomes visible
        if (typeof (window as any).Prism !== 'undefined') {
          setTimeout(() => {
            (window as any).Prism.highlightAllUnder(targetSection);
          }, 0);
        }
      }
    });
  });
}
