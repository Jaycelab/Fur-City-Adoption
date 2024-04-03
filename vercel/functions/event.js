const handler = async () => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: "jayce".toUpperCase(),
  };
};

module.exports = { handler };
