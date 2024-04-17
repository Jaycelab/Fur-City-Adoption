const getClient = require("../../lib/getClient");
const isAdmin = require("../../lib/isAdmin");

//parsing data into json object
const handler = async (event) => {
  const body = JSON.parse(event.body);
  //logs json parse
  console.log(body);
  if (isAdmin(event)) {
    //saving into database
    const client = await getClient();
    //accessing client pet database
    await client.db().collection("pets").insertOne(body);
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
