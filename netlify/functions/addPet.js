const isAdmin = require("../../lib/isAdmin");

//parsing data into json object
const handler = async (event) => {
  const body = JSON.parse(event.body);

  if (isAdmin(event)) {
    //saving into database

    
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
