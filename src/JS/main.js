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
  // Get the country information from the object
  const countryName = document.createTextNode(countryObject.name.common)

  const div = document.createElement("div")
  div.classList.add("card")

  const img = document.createElement("img")
  img.alt = countryObject.flags.alt
  img.src = countryObject.flags.svg

  const h3 = document.createElement("h3")
  h3.appendChild(countryName)

  const infoDiv = createInfoDiv(countryObject)
  infoDiv.prepend(h3)

  div.appendChild(img)
  div.appendChild(infoDiv)

  cardsContainer.appendChild(div)
}

function createInfoDiv(countryObject) {
  const div = document.createElement("div")
  const countryPopulation = document.createTextNode(countryObject.population)
  const countryRegion = document.createTextNode(countryObject.region)
  const countryCapital = document.createTextNode(countryObject.capital)
  const arr = [document.createTextNode("Population: "), document.createTextNode("Region: "), document.createTextNode("Capital: ")]
  const arr2 = [countryPopulation, countryRegion, countryCapital]

  for (let i = 0; i < arr.length; i++) {

    const p = document.createElement("p")
    p.appendChild(arr[i])
    const span = document.createElement("span")
    span.appendChild(arr2[i])
    p.appendChild(span)
    div.appendChild(p)

  }
  return div
}

fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => data.filter((countryObject) => countryObject.name.common !== "Israel"))
  .then(data => data.forEach((countryObject) => createCountryCard(countryObject)))
  .catch(error => console.log(error))

