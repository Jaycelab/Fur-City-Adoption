const { ObjectId } = require("mongodb");
const sanitizeHtml = require("sanitize-html");
const getClient = require("../../lib/getClient");
const isAdmin = require("../../lib/isAdmin");

//sanitize HTML func
function cleanUp(san) {
  //data to sanitize, config object
  return sanitizeHtml(san, {
    //nothing allowed using [] and {}
    allowedTags: [],
    allowedAttributes: {},
  });
}

//parsing data into json object
const handler = async (event) => {
  const body = JSON.parse(event.body);
  //logs json parse

  //validation for default object property
  let pet = {
    name: cleanUp(body.name),
    species: cleanUp(body.species),
    description: cleanUp(body.description),
    //defaults to fallback current year if invalid. no sanitize needed
    birthYear: new Date().getFullYear(),
  };

  //validation birth year between 3 & 4 digits
  if (body.birthYear > 999 && body.birthYear < 9999) {
    pet.birthYear = body.birthYear;
  }

  //validates species , fallback to dog
  if (pet.species != "cat" && pet.species != "dog") {
    pet.species = "dog";
  }

  if (isAdmin(event)) {
    //saving into database
    if (ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        header: { "Content-Type": "application/json" },
        body: JSON.stringify({ success: false }),
      };
    }

    const client = await getClient();
    //find one and what to update
    await client
      .db()
      .collection("pets")
      .findOneAndUpdate({ _id: new ObjectId(body.id) }, { $set: pet });
    client.close();

    return {
      statusCode: 200,
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true }),
    };
  }

  return {
    statusCode: 200,
    header: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: false }),
  };
};

module.exports = { handler };
