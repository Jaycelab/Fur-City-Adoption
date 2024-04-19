const escape = require("escape-html");
const { ObjectId } = require("mongodb");
const getClient = require("../../lib/getClient");
const isAdmin = require("../../lib/isAdmin");

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
        body: JSON.stringify({ success: false }),
      };
    }

    const client = await getClient();

    //tracks incoming id HTML, delete
    await client
      .db()
      .collection("pets")
      .deleteOne({ _id: new ObjectId(body.id) });
    client.close();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ success: true }),
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
