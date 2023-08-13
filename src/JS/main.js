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
const cardsContainer = document.getElementById("cards-container");
const countryCardTemplate = document.querySelector("[data-country-template]");

function createCountryCard(countryObject) {
  const { name, flags, population, region, capital } = countryObject;

  //!!!!!!!!!!!!!!!!!!!!//
  if (name.common === "Israel") return null
  //!!!!!!!!!!!!!!!!!!!!//

  const card = countryCardTemplate.content.cloneNode(true).children[0];
  card.title = name.common;

  const img = card.querySelector("img");
  img.src = flags.svg;
  img.alt = flags.alt;

  // special styles for the only none rectangle flag in the world
  if (name.common === "Nepal") img.style.height = "30%";

  const h3 = card.querySelector("div h3");
  h3.textContent = name.common;

  card.querySelector("[data-population] span").textContent = population.toLocaleString();
  card.querySelector("[data-region] span").textContent = region;
  //!!!!!!!!!!!!!!!!!!!!//
  card.querySelector("[data-capital] span").textContent = name.common === "Palestine" ? "Jerusalem" : capital;
  //!!!!!!!!!!!!!!!!!!!!//

  cardsContainer.append(card);

  return { name: name.common, region: region, capitals: capital, element: card }
}

let countries = [];

fetch("https://restcountries.com/v3.1/all")
  .then(response => response.json())
  .then(data => {
    data.forEach(countryObject => {
      countries.push(createCountryCard(countryObject));
    });
    document.getElementById("search-bar").style.display = "flex";
  })
  .catch(error => {
    console.log(error);
    document.querySelector(".error").style.display = "flex";
  });

///////////////////////////////////////////
// handle filter by region
const regionFilter = document.getElementById("region-filter");
const searchInput = document.getElementById("search-input");

regionFilter.addEventListener("input", e => {
  searchInput.textContent = "";
  searchInput.value = "";
  countries.forEach(country => {
    const value = e.target.value;

    if (value === "All") {
      country.element.classList.remove("hidden");
      return;
    }
    const isVisible = country.region === value;
    country.element.classList.toggle("hidden", !isVisible);
  })
})

// Handel search input 
searchInput.addEventListener("input", e => {
  const value = e.target.value.trim();

  countries.forEach(country => {
    if (country === null) return

    if (regionFilter.value !== "All") {
      if (country.region !== regionFilter.value) {
        country.element.classList.add("hidden");
        return;
      }
    }
    const isVisible = country.name.toLowerCase().includes(value.toLowerCase());

    country.element.classList.toggle("hidden", !isVisible);
  })
})

// Focus on the search input on click ctr + k
window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyK' && event.ctrlKey) {
    event.preventDefault()
    searchInput.focus()
  }
});