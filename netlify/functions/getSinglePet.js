const escape = require("escape-html");
const { MongoClient, ObjectId } = require("mongodb");
const isAdmin = require("../../lib/isAdmin");

const cookie = require("cookie");

const handler = async (event) => {
  //cookie
  //removing parse check and if statement using reusable func below
  if (isAdmin(event)) {
    const body = JSON.parse(event.body);

    if (!ObjectId.isValid(body.id)) {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      };
    }

    const client = new MongoClient(process.env.CONNECTIONSTRING);
    await client.connect();

    //tracks incoming id HTML
    const pet = await client
      .db()
      .collection("pets")
      .findOne({ _id: new ObjectId(body.id) });
    client.close();

    //modifying pet props
    pet.name = escape(pet.name);
    pet.birthYear = escape(pet.birthYear);
    pet.species = escape(pet.species);
    pet.description = escape(pet.description);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
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

module.exports = { handler };
