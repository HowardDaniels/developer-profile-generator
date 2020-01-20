const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt({
    message: "Enter your GitHub username",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

axios.get(queryUrl).then(function(res) {
  

  const profile = `<html>
  <head>
  </head>
  <body>
  <p>${res.data.login}</p>
  </body>
  </html>`;

  fs.writeFile("index.html", profile, function(err) {
    if (err) {
      throw err;
    }

  //  console.log(`Saved ${repoNames.length} repos`);
  });
});
});