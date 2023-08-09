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

///////////////////////////////////////////
const cardsContainer = document.getElementById("cards-container")

function createCountryCard(countryObject) {

  const { flags, name, population, region, capital } = countryObject

  const div = document.createElement("div");
  div.classList.add("card");
  div.title = name.common


  const img = document.createElement("img");
  img.alt = flags.alt;
  img.src = flags.svg;

  const h3 = document.createElement("h3");
  h3.textContent = name.common;

  const infoDiv = document.createElement("div");

  const populationText = document.createElement("p");
  populationText.textContent = `Population: `;

  const populationSpan = document.createElement("span");
  populationSpan.textContent = population.toLocaleString();

  const regionText = document.createElement("p");
  regionText.textContent = `Region: `;

  const regionSpan = document.createElement("span");
  regionSpan.textContent = region;

  const capitalText = document.createElement("p");
  capitalText.textContent = `Capital: `;

  const capitalSpan = document.createElement("span");
  capitalSpan.textContent = capital;

  populationText.appendChild(populationSpan);
  regionText.appendChild(regionSpan);
  capitalText.appendChild(capitalSpan);

  infoDiv.appendChild(h3)

  infoDiv.appendChild(populationText);
  infoDiv.appendChild(regionText);
  infoDiv.appendChild(capitalText);

  div.appendChild(img);
  div.appendChild(infoDiv);
  cardsContainer.appendChild(div);
}

fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => data.filter((countryObject) => countryObject.name.common !== "Israel"))
  .then(data => data.forEach((countryObject) => createCountryCard(countryObject)))
  .catch(error => console.log(error))

