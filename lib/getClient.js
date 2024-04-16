const { MongoClient } = require("mongodb");

//reusable function to get user database
async function getDB() {
  const client = new MongoClient(process.env.CONNECTIONSTRING);
  await client.connect();
  return client;
}

module.exports = getDB;
