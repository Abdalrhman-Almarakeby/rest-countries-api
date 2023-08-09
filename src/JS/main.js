// Handle dark mode and light mode
const darkModeBtn = document.getElementById("dark-mode-btn");
const page = document.documentElement;

function toggleDarkMode() {
  page.classList.toggle("dark");
  localStorage.setItem(
    "mode",
    page.classList.contains("dark") ? "dark" : "light"
  );
  changeModeText();
}


function changeModeText() {
  const modeText = darkModeBtn.querySelector("span");
  const isDarkMode = page.classList.contains("dark");
  modeText.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  changeIconSrc(isDarkMode)
}

function changeIconSrc(isDarkMode) {
  const icon = darkModeBtn.querySelector("img");
  icon.src = isDarkMode ? "./public/icons/sun.svg" : "./public/icons/moon.svg";
}

darkModeBtn.addEventListener("click", toggleDarkMode);

window.addEventListener("load", () => {
  const preferredMode = localStorage.getItem("mode");
  if (preferredMode === "dark") {
    page.classList.add("dark");
  }
  changeModeText();
});
