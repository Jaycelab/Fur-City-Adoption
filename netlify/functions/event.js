const getClient = require("../../lib/getClient");

const handler = async () => {
  //reusable func to get access to database client
  const client = await getClient(); 
  const pets = await client.db().collection("pets").find().toArray();
  client.close();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
