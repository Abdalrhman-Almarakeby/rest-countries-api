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
  changeModeText();
}

function changeIconSrc() {
  const icon = darkModeBtn.querySelector("img");
  if (page.classList.contains("dark")) {
    icon.src = "./public/icons/sun.svg";
  } else {
    icon.src = "./public/icons/moon.svg";
  }
}

function changeModeText() {
  const modeText = darkModeBtn.querySelector("span")
  if (page.classList.contains("dark")) {
    modeText.textContent = "Light Mode"
  } else {
  modeText.textContent = "Dark Mode"
  }
}

darkModeBtn.addEventListener("click", toggleDarkMode);

window.addEventListener("load", () => {
  const preferredMode = localStorage.getItem("mode");
  if (preferredMode === "dark") {
    page.classList.add("dark");
  }
  changeIconSrc();
  changeModeText();
});
