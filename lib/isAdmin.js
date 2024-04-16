const cookie = require("cookie");
//checks if visitor has permission
function isAdmin(event) {
  const cookieCheck = cookie.parse(event.headers.cookie || "");
  if (cookieCheck?.petadoption == "asdsaasdsadsf21313asdasdasdsa") {
    return true;
  }
  return false;
}

module.exports = isAdmin;
