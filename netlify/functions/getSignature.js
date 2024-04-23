const cloudinary = require("cloudinary").v2;
const isAdmin = require("../../lib/isAdmin");

//provides user client permission to upload via cloudify for 60 minutes
const cloudinaryConfig = cloudinary.config({
  cloud_name: "dysnlfeaw",
  api_key: "215643187696965",
  api_secret: process.env.CLOUDINARYSECRET,
  secure: true,
});

const handler = async (event) => {
  //removing parse check and if statement using reusable func below
  if (isAdmin(event)) {
    //generate signature and timestamp to parse into JSON body
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      cloudinaryConfig.api_secret
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timestamp, signature }),
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
