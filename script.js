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
  <li>Followed by: ${res.data.following}</li>`;

  fs.writeFile("index.html", profile, function(err) {
    if (err) {
      throw err;
    }

  //  console.log(`Saved ${repoNames.length} repos`);
  });
});

axios.get(queryUrl2).then(function(res) {

 // console.log(res);
  var stars = 0;
  for (i = 0; i < res.data.length; i++){
    stars += res.data[1].stargazers_count;
  }
  console.log(stars);

  const starCount = `<li>Stars: ${stars}</li>
  </ul>
  </body>
  </html>`;

  fs.appendFile("index.html", starCount, function(err) {
    if (err) {
      throw err;
    }

    convertFactory = require('electron-html-to');

    fs.readFile('index.html', 'utf8', (err, htmlString) => {
      "/index.html"
      htmlString = htmlString.replace(/href="|src="/g, match => {
        return match + 'file://path/to/you/base/public/directory';
      });
    });
 
    var conversion = convertFactory({
      converterPath: convertFactory.converters.PDF
    });
     
    conversion("index.html", function(err, result) {
      if (err) {
        return console.error(err);
      }
     
      console.log(result.numberOfPages);
      console.log(result.logs);
      result.stream.pipe(fs.createWriteStream('/path/to/anywhere.pdf'));
      conversion.kill(); // necessary if you use the electron-server strategy, see below for details
    });
  /* const stars = ${} */
});
});
});
/*
//var fs = require('fs'),
    convertFactory = require('electron-html-to');
 
var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});
 
conversion({ html: "index.html"}, function(err, result) {
  if (err) {
    return console.error(err);
  }
 
  console.log(result.numberOfPages);
  console.log(result.logs);
  result.stream.pipe(fs.createWriteStream('/path/to/anywhere.pdf'));
  conversion.kill(); // necessary if you use the electron-server strategy, see below for details
}); */