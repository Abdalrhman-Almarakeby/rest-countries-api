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
const countryCardTemplate = document.querySelector("[data-country-template]")

function createCountryCard(countryObject) {
  const { name, flags, population, region, capital } = countryObject

  // //!!!!!!!!!!!!!!!!!!!!//
  // if (name.common === "Israel") { return null }
  // //!!!!!!!!!!!!!!!!!!!!//

  const card = countryCardTemplate.content.cloneNode(true).children[0]
  card.title = name.common;

  const img = card.querySelector("img")
  img.src = flags.svg
  img.alt = flags.alt

  // special styles for the only none rectangle flag in the world
  if (name.common === "Nepal") img.style.height = "30%"

  const h3 = card.querySelector("div h3");
  h3.textContent = name.common;

  card.querySelector("[data-population] span").textContent = population.toLocaleString();
  card.querySelector("[data-region] span").textContent = region;
  card.querySelector("[data-capital] span").textContent = name.common === "Palestine" ? "Jerusalem" : capital;

  cardsContainer.append(card)

  return { name: name.common, region: region, capitals: capital, element: card }
}

let countries = []

fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => {
    data.forEach((countryObject) => {
      countries.push(createCountryCard(countryObject));
    })
  })
///////////////////////////////////////////
// handle filter by region
const regionFilter = document.getElementById("region-filter")
const searchInput = document.getElementById("search-input")

regionFilter.addEventListener("input", (e) => {
  countries.forEach((country) => {
    const value = e.target.value
    if (value === "All") {
      country.element.classList.remove("hidden")
      return
    }
    const isVisible = country.region === value
    if (!isVisible) {
      country.element.classList.add("hidden")
    } else {
      country.element.classList.remove("hidden")
    }
  })

  searchInput.textContent = ""
  searchInput.value = ""
})

// Handel search input 
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.trim()

  countries.forEach((country) => {
    if (regionFilter.value !== "All") {
      if (country.region !== regionFilter.value) {
        country.element.classList.add("hidden")
        return
      }
    }

    const isVisible = country.name.toLowerCase().includes(value.toLowerCase()) //|| country.capitals.forEach((capital) => { capital.includes(value) })
    if (!isVisible) {
      country.element.classList.add("hidden")
    } else {
      country.element.classList.remove("hidden")
    }
  })
})