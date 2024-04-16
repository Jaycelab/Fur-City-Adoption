const { MongoClient } = require("mongodb");
const isAdmin = require("../../lib/isAdmin");

const cookie = require("cookie");

const handler = async (event) => {
  //cookie
  //removing parsecheck and if statement using reusable func below
  if (isAdmin(event)) {
    const client = new MongoClient(process.env.CONNECTIONSTRING);
    await client.connect();

    const pets = await client.db().collection("pets").find().toArray();
    client.close();

    const petsHTML = generateHTML(pets);

    return {
      statusCode: 200,
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true, pets: petsHTML }),
    };
  }

  return {
    statusCode: 200,
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ success: false }),
  };
};

function generateHTML(pets) {
  //looping to generate HTML and adding div tags
  //create new array based from old arr with join method to combine string values rather than an array. Passing func to apply to each arr
  let ourHTML = `<div class="list-pets">`;
  ourHTML += pets
    .map((pet) => {
      return `<div class="pet-card">
      <div class="pet-card-text">
        <h3>${pet.name}</h3>
        <p class="pet-description">${pet.description}</p>
        
        <div class="action-buttons">
          <a class="action-btn" href="#">Edit</a>
          <button class="action-btn">Delete</button>
        </div>
      </div>
      <div class="pet-card-photo">
        <img src="/images/fallback.jpg" alt="A ${pet.species} named ${pet.name}">
      </div>
    </div>`;
    })
    .join("");
  ourHTML += "</div>";
  return ourHTML;
}

module.exports = { handler };
