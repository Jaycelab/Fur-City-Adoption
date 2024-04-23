let serverTimestamp;
let serverSignature;
let cloudinaryReturnedObject;

async function getSignature() {
  const signaturePromise = await fetch("/.netlify/functions/getSignature");
  const theResponse = await signaturePromise.json();
  console.log(theResponse);

  //assigning variables to pass on data append below
  serverSignature = theResponse.signature;
  serverTimestamp = theResponse.timestamp;
}

getSignature();

//a - event to add, b - what to do
document
  .querySelector("#file-field")
  .addEventListener("change", async function () {
    //new instance form data to upload bits of data rather than text
    const data = new FormData();
    //what to upload, a - type, b - value
    //files method with first element of array
    data.append("file", document.querySelector("#file-field").files[0]);
    data.append("api_key", "215643187696965");
    data.append("signature", serverSignature);
    data.append("timestamp", serverTimestamp);

    //sending to Cloudinary via axios. fetch not recommended
    //para. A - URL. B-data to send C- object data listing assortment to upload eg jpeg
    const cloudinaryResponse = await axios.post(
      "https://api.cloudinary.com/v1_1/dysnlfeaw/auto/upload",
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (e) {
          //testing
          console.log(e.loaded / e.total);
        },
      }
    );
    //test display object data
    console.log(cloudinaryResponse.data);

    // Gives access to client add pet script
    cloudinaryReturnedObject = cloudinaryResponse.data;

    //dynamically uploading photo via cloud and using DOM to apply css attributes using public ID as selector
    document.querySelector("#photo-preview").innerHTML = `<img
    src="https://res.cloudinary.com/dysnlfeaw/image/upload/w_190,h_190,c_fill/${cloudinaryResponse.data.public_id}.jpg"/>`;
  });
