//parsing data into json object
const handler = async (event) => {
  const body = JSON.parse(event.body);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true }),
  };
};
module.exports = { handler };
