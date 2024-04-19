const escape = require("escape-html");
const getClient = require("../../lib/getClient");
const isAdmin = require("../../lib/isAdmin");

const handler = async (event) => {
  //removing parsecheck and if statement using reusable func below
  if (isAdmin(event)) {
    const client = await getClient();
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
  //create new array based from old arr with join method to combine string values rather than an array. Passing func to apply to each arr
  //using escape to escape any unfiltered js scripts
  //converts any symbols to text character
  let ourHTML = `<div class="list-pets">`;
  ourHTML += pets
    .map((pet) => {
      return `<div class="pet-card">
      <div class="pet-card-text">
        <h3>${escape(pet.name)}</h3>
        <p class="pet-description">${escape(pet.description)}</p>
        
        <div class="action-buttons">
          <a class="action-btn" href="/admin/edit-pet?id=${pet._id}">Edit</a>
          <button class="action-btn">Delete</button>
        </div>
      </div>
      <div class="pet-card-photo">
        <img src="../images/fallback.jpg" alt="A ${escape(
          pet.species
        )} named ${escape(pet.name)}">
      </div>
    </div>`;
    })
    .join("");
  ourHTML += "</div>";
  return ourHTML;
}

module.exports = { handler };
