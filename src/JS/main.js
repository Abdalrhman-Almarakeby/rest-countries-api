// Handle dark mode and light mode
const darkModeBtn = document.getElementById("dark-mode-btn");
const page = document.documentElement;

function toggleDarkMode() {
  page.classList.toggle("dark");
  localStorage.setItem(
    "mode",
    page.classList.contains("dark") ? "dark" : "light"
  );
  changeIconSrc();
}

function changeIconSrc() {
  const icon = darkModeBtn.querySelector("img");
  if (page.classList.contains("dark")) {
    icon.src = "../public/icons/moon.svg";
  } else {
    icon.src = "../public/icons/moon-outline.svg";
  }
}

darkModeBtn.addEventListener("click", toggleDarkMode);

window.addEventListener("load", () => {
  const preferredMode = localStorage.getItem("mode");
  if (preferredMode === "dark") {
    page.classList.add("dark");
  }
  changeIconSrc();
});
