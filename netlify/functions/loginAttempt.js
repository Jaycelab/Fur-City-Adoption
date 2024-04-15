const cookie = require("cookie");

//cookie
const handler = async (event) => {
  const body = JSON.parse(event.body);

  if (body.username == "jason" && body.password == "jayce") {
    //serialize accepting three methods
    const myCookie = cookie.serialize(
      "petadoption",
      "asdsaasdsadsf21313asdasdasdsa",
      {
        //suggest to always set to true
        httpOnly: true,
        path: "/",
        sameSite: "strict",
        //measured in seconds. 60 seconds , 60 minutes, 24 hours
        maxAge: 60 * 60 * 24,
      }
    );

    //sets cookie if login is true and redirects user to admin rather than returning to login page
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": myCookie,
        Location: "/",
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
