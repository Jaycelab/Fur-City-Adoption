const cookie = require("cookie");

//cookie
const handler = async (event) => {
  //serialize accepting three methods
  const myCookie = cookie.serialize("petadoption", "-", {
    //suggest to always set to true
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    //measured in ms
    maxAge: 0,
    //setting logout maxAge to 0 to let expire
  });

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
};

module.exports = { handler };
