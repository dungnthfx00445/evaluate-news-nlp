import { checkForURL } from "./urlChecker";
const axios = require("axios");

function handleSubmit(event) {
  event.preventDefault();
  console.log("::: FORM INPUT VALID :::");
  // Get the URL from the input field
  const formText = document.getElementById("name").value;
  const results = document.getElementById("results");

  if (checkForURL(formText)) {
    console.log("::: FORM INPUT VALID :::");

    axios
      .post("/api/validate", JSON.stringify({ text: formText }), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        if (res.status !== 200) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        results.innerHTML = JSON.stringify(res.data);
      })
      .catch((error) => {
        console.error(`An error occurred: ${error.message}`);
        alert(`An error occurred: ${error.message}`);
      });
  } else {
    // Display error message if URL is not valide
    results.innerHTML =
      "The URL:[" +
      JSON.stringify(formText) +
      "] is not valide. Please enter a valid url.";
  }
}

export { handleSubmit };
