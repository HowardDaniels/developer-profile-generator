const fs = require("fs");
const pdf = require('html-pdf');
const html = fs.readFileSync('./index.html', 'utf8');
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([{
    type: "input",
    message: "GitHub username:",
    name: "username"
  },
  {
    type: "input",
    message: "Favorite color:",
    name: "color"
  }
])
  .then(function( answers ) {
    const queryUrl = `https://api.github.com/users/${answers.username}`;
    const queryUrl2 = `https://api.github.com/users/${answers.username}/repos`;

axios.get(queryUrl).then(function(res) {
  
console.log(res);

var location = res.data.location;
var mapsPlace = location.split(' ').join('+');

  const profile = `<html>
  <head>
  </head>
  <body style="background-color: ${answers.color};">
  <h1>${res.data.login}</h1>
  <hr>
  <img src="${res.data.avatar_url}">
  <br>
  <strong>
  <a href="${res.data.url}">Link to Profile</a>
  <p>Location: <a href="https://www.google.com/maps/place/${mapsPlace}">${res.data.location}</a></p>
  <p><i>${res.data.bio}</i></p>
  </strong>
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
    stars += res.data[i].stargazers_count;
  }
  console.log(stars);

 //document.getElementById("stars").remove();

  const starCount = `<li id="stars">Stars: ${stars}</li>
  </ul>
  </body>
  </html>`;

  fs.appendFile("index.html", starCount, function(err) {
    if (err) {
      throw err;
    }
/*
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

pdf.create(html, options).toFile('./profile.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
/*
function({color}){
  var html = "index.html";
    html.setAttribute("style", "background-color: " + color + ";");
});
function({color}){

    var html = "index.html";
    html.setAttribute("style", "background-color: " + color + ";");
  })
  );
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