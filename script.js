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
    const queryUrl2 = `https://api.github.com/users/${username}/repos`;

axios.get(queryUrl).then(function(res) {
  
console.log(res);

  const profile = `<html>
  <head>
  </head>
  <body>
  <h1>${res.data.login}</h1>
  <hr>
  <img src="${res.data.avatar_url}">
  <br>
  <a href="${res.data.url}">Link to Profile</a>
  <p>Location: ${res.data.location}</p>
  <p>${res.data.bio}</p>
  <br>
  <h2>Stats</h2>
  <ul>
  <li>Public Repositories: ${res.data.public_repos}</li>
  <li>Followers: ${res.data.followers}</li>
  <li>Followed by: ${res.data.following}</li>
  </ul>
  </body>
  </html>`;

  fs.writeFile("index.html", profile, function(err) {
    if (err) {
      throw err;
    }

  //  console.log(`Saved ${repoNames.length} repos`);
  });
});

axios.get(queryUrl2).then(function(res) {

  console.log(res);
 /* const stars = ${} */
});
});