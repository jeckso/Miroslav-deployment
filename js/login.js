const axios = require("axios");
const $ = require("jquery");

$("#btn").click(() => {
  const nick = $("#nick").val();
  const pass = $("#pass").val();

  if (!nick.length) {
    alert("Invalid nickname");
  } else if (!pass.length) {
    alert("Invalid password");
  } else {
    const data = {
      nick,
      pass
    };
    console.log(data);
    return axios.post("/login", data).then(result => {
      if (result.data.status) {
        window.location.assign("/expert");
      } else {
        alert("User does not exists");
      }
    });
  }
});
