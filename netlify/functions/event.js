const handler = async () => {
  const pets = [
    { name: "Meowsalot", species: "cat" },
    { name: "Barksalot", species: "dog" },
  ];

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
