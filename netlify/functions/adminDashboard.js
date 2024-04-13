const { MongoClient } = require("mongodb");

const cookie = require("cookie");

//cookie
const handler = async (event) => {
  const cookieCheck = cookie.parse(event.headers.cookie || "");
  if (cookieCheck?.petadoption == "asdsaasdsadsf21313asdasdasdsa") {
    const client = new MongoClient(process.env.CONNECTIONSTRING);
    await client.connect();

    const pets = await client.db().collection("pets").find().toArray();
    client.close();

    const petsHTML = generateHTML(pets);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true, pets: petsHTML }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ success: false }),
  };
};

function generateHTML(pets) {
  //looping to generate HTML and adding div tags
  let ourHTML = `<div class="list-of-pets">`;
  //create new array based from old arr with join method to combine string values rather than an array. Passing func to apply to each arr
  ourHTML += pets.map();
  //returning pet database
  ourHTML += pets
    .map((pet) => {
      return `<div class="pet-card">
    <div class="pet-card-text">
      <h3>${pet.name}</h3>
      <p class="pet-description">${pet.description}</p>
     </div>
    
     <div class="pet-card-photo">
      <img src="/img/fallback.jpg" alt="A ${pet.species} named ${pet.name}" />
    </div>
  </div>`;
    })
    .join("");
  ourHTML += "</div>";
}

module.exports = { handler };
