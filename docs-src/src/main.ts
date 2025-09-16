import "./styles/main.css";
import { initPlayground } from "./playground";
import { initTheme } from "./theme";
import { initSearch } from "./search";

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initPlayground();
  initSearch();
});
