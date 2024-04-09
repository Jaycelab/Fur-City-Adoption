async function start() {
  const callPromise = await fetch("/.netlify/functions/adminDashboard");
  const petData = await callPromise.json();

  if (petData.success) {
  } else {
    //redirect users to login page
    window.location = "/login";
  }
}

start();
