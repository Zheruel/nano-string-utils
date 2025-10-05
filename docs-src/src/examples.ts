declare const Prism: any;
import { recipes, categories, type Recipe } from "./examples-guide.js";

export function initExamples() {
  const examplesContainer = document.getElementById("examples-viewer");
  if (!examplesContainer) return;

  examplesContainer.innerHTML = `
    <div class="bundle-size-container">
      <h2>Recipes & Examples</h2>
      <p class="intro">
        Real-world examples showing how to combine nano-string-utils functions to solve common problems.
        Copy and adapt these recipes for your projects.
      </p>

      <div class="examples-nav">
        ${categories
          .map(
            (cat, i) => `
          <button class="filter-tag ${i === 0 ? "active" : ""}" data-category="${cat.id}">
            <span style="opacity: 0.8">${cat.icon}</span> ${cat.name}
          </button>
        `
          )
          .join("")}
      </div>

      <div class="examples-grid" id="examples-grid">
        ${renderRecipes()}
      </div>

      <div class="footer-note" style="margin-top: 3rem;">
        <h3>💡 Tips for Using These Recipes</h3>
        <ul>
          <li>All examples are production-ready and can be copied directly into your project</li>
          <li>Click the "Copy Code" button to copy the entire example to your clipboard</li>
          <li>Functions are tree-shakeable - only imported functions add to your bundle</li>
          <li>Combine multiple recipes to build more complex functionality</li>
          <li>Use the Playground tab to experiment with individual functions interactively</li>
        </ul>
      </div>
    </div>
  `;

  // Add event listeners for category filtering
  setupCategoryFilters();

  // Add copy button functionality
  setupCopyButtons();

  // Highlight code blocks when section is visible
  // Note: This may not work if section is hidden on init
  // Main navigation handler will re-trigger highlighting when section becomes visible
  if (typeof Prism !== 'undefined') {
    setTimeout(() => {
      const examplesSection = document.getElementById('examples');
      if (examplesSection && examplesSection.classList.contains('active')) {
        Prism.highlightAllUnder(examplesSection);
      }
    }, 0);
  }
}

function renderRecipes(): string {
  return recipes
    .map(
      (recipe) => `
    <div class="recipe-card" data-category="${recipe.category}">
      <div class="recipe-header">
        <h3 class="recipe-title">${recipe.title}</h3>
        <span class="recipe-category">${getCategoryName(recipe.category)}</span>
      </div>

      <p class="recipe-description">${recipe.description}</p>

      <div class="recipe-problem">
        <strong>Problem:</strong> ${recipe.problem}
      </div>

      <div class="recipe-code-section">
        <div class="code-header">
          <span class="code-label">Solution</span>
          <button class="copy-code-btn" data-recipe-id="${recipe.id}">
            📋 Copy Code
          </button>
        </div>
        <pre class="recipe-code"><code class="language-javascript">${recipe.code}</code></pre>
      </div>

      <div class="recipe-explanation">
        <strong>How it works:</strong> ${recipe.explanation}
      </div>

      <div class="recipe-functions">
        <strong>Functions used:</strong>
        ${recipe.functions
          .map(
            (fn) =>
              `<code class="function-tag">${fn}</code>`
          )
          .join(" ")}
      </div>
    </div>
  `
    )
    .join("");
}

function setupCategoryFilters() {
  const filterButtons = document.querySelectorAll(".filter-tag");
  const recipeCards = document.querySelectorAll(".recipe-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = (btn as HTMLElement).dataset.category;

      // Update active state
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter recipes
      recipeCards.forEach((card) => {
        const cardCategory = (card as HTMLElement).dataset.category;
        const shouldShow = category === "all" || cardCategory === category;

        (card as HTMLElement).style.display = shouldShow ? "" : "none";
      });
    });
  });
}

function setupCopyButtons() {
  const copyButtons = document.querySelectorAll(".copy-code-btn");

  copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const recipeId = (btn as HTMLElement).dataset.recipeId;
      const recipe = recipes.find((r) => r.id === recipeId);

      if (recipe) {
        navigator.clipboard.writeText(recipe.code);
        const originalText = btn.textContent;
        btn.textContent = "✅ Copied!";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }
    });
  });
}

function getCategoryName(categoryId: string): string {
  const category = categories.find((c) => c.id === categoryId);
  return category ? `${category.icon} ${category.name}` : categoryId;
}
