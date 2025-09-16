export function initTheme() {
  const themeToggle = document.querySelector(".theme-toggle");
  const sunIcon = document.querySelector(".sun-icon") as HTMLElement;
  const moonIcon = document.querySelector(".moon-icon") as HTMLElement;

  const getTheme = () => localStorage.getItem("theme") || "dark";

  const setTheme = (theme: string) => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      sunIcon.style.display = "none";
      moonIcon.style.display = "block";
    } else {
      sunIcon.style.display = "block";
      moonIcon.style.display = "none";
    }
  };

  // Set initial theme
  setTheme(getTheme());

  // Toggle theme on click
  themeToggle?.addEventListener("click", () => {
    const currentTheme = getTheme();
    setTheme(currentTheme === "light" ? "dark" : "light");
  });
}
