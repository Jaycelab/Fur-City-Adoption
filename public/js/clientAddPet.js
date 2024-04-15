//prevents page from reloading when adding new pet
document
  .querySelector("#add-new-pet-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    //using DOM to target object pet value
    const pet = {
      name: document.querySelector("#name").value,
      birthYear: document.querySelector("#birthYear").value,
      species: document.querySelector("#species").value,
      description: document.querySelector("#description").value,
    };

    console.log(pet);
  });
