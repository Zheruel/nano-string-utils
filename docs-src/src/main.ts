import "./styles/main.css";
import "./styles/migration.css";
import "./styles/migration-improvements.css";
import "./styles/migration-panels.css";
import { initPlayground } from "./playground";
import { initTheme } from "./theme";
import { initSearch } from "./search";
import { initMigrationGuide } from "./migration";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initPlayground();
  initSearch();
  initMigrationGuide();
  initNavigation();
});

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll(
    ".playground-section, .migration-section"
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
      if (targetSection) targetSection.classList.add("active");
    });
  });
}
