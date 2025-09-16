export function initSearch() {
  const searchInput = document.getElementById(
    "function-search"
  ) as HTMLInputElement;
  const functionItems = document.querySelectorAll(".function-item");

  searchInput?.addEventListener("input", (e) => {
    const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();

    functionItems.forEach((item) => {
      const functionName =
        item.getAttribute("data-function")?.toLowerCase() || "";
      const category = item.closest(".category") as HTMLElement;

      if (functionName.includes(searchTerm)) {
        (item as HTMLElement).style.display = "block";
      } else {
        (item as HTMLElement).style.display = "none";
      }

      // Show/hide category if all items are hidden
      const visibleItems = category?.querySelectorAll(
        '.function-item[style*="block"]'
      );
      if (category) {
        category.style.display =
          (visibleItems?.length || 0) > 0 || searchTerm === ""
            ? "block"
            : "none";
      }
    });
  });
}
