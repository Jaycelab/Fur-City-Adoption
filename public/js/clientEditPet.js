//parses specific part of URL or ID for specific pet to get data from db
const urlVariables = new URLSearchParams(window.location.search);
const id = urlVariables.get("id");

async function getEditPet() {
  const ourPromise = await fetch("/.netlify/functions/getSinglePet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    //id: id equivalent to id
    body: JSON.stringify({ id }),
  });

  const pet = await ourPromise.json();
  console.log(pet);
}

getEditPet();
