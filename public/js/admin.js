async function start() {
  const callPromise = await fetch("/.netlify/functions/adminDashboard");
  const petData = await callPromise.json();
  console.log(petData);
}

start();
