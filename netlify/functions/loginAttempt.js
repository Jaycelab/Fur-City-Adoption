const cookie = require("cookie");

//cookie
const handler = async (event) => {
  const body = JSON.parse(event.body);

  if (body.username == "jason" && body.password == "jayce") {
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
