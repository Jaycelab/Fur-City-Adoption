const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();

async function start() {
  const weatherPromise = await fetch(
    "https://api.weather.gov/gridpoints/LOX/155,45/forecast"
  );

  const weatherData = await weatherPromise.json();

  const localTemp = weatherData.properties.periods[0].temperature;
  document.querySelector("#temp-output").textContent = localTemp;
}

start();

async function petsArea() {
  const petsPromise = await fetch(".netlify/functions/event");

  const petsData = await petsPromise.json();

  //anonymous inline function shortcut
  //pulling data for each index element using dot notation from the pet argument
  petsData.forEach((pet) => {
    //create clone of pet card html.
    const clone = template.content.cloneNode(true);

    //pet-card area. textContent over innerHTML to apply escape
    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".pet-description").textContent = pet.description;

    //pet-card age
    clone.querySelector(".pet-age").textContent = calcAge(pet.birthYear);

    //pet-ard species
    clone.querySelector(".pet-card").dataset.species = pet.species;

    //fallback photo
    if (!pet.photo) pet.photo = "img/fallback.jpg";

    //photo card
    clone.querySelector(".pet-card-photo img").src = pet.photo;

    //dynamic pet-card src and alt
    clone.querySelector(
      ".pet-card-photo img"
    ).alt = `A ${pet.species} name ${pet.name}`;

    wrapper.appendChild(clone);
  });
  document.querySelector(".list-pets").appendChild(wrapper);
}

petsArea();

//age calculation function with getFullYear() method
function calcAge(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age === 1) return "1 year old";
  if (age === 0) return "Less than a year old";

  return `${age} years old`;
}

//pet-filter button
//selecting all buttons and intreating through with click function
const allButtons = document.querySelectorAll(".pet-filter button");

allButtons.forEach((el) => {
  el.addEventListener("click", handleButtonClick);
});

function handleButtonClick(e) {
  // remove active class from any and all buttons
  allButtons.forEach((el) => el.classList.remove("active"));

  // add active class to specific clicked button
  e.target.classList.add("active");

  // filter pets
  //data filter can be assigned to a html object using dataset
  const currentFilter = e.target.dataset.filter;

  document.querySelectorAll(".pet-card").forEach((el) => {
    if (currentFilter === el.dataset.species || currentFilter === "all") {
      el.style.display = "grid";
    } else {
      el.style.display = "none";
    }
  });
}
