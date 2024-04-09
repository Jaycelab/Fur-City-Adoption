const cookie = require("cookie");

//cookie
const handler = async (event) => {
  const cookieCheck = cookie.parse(event.headers.cookie || "");
  if (cookieCheck?.petadoption == "") {
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
