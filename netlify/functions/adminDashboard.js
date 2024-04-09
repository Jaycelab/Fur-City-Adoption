//cookie
const handler = async (event) => {
  console.log(event.headers.cookie);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ success: true }),
  };
};

module.exports = { handler };
