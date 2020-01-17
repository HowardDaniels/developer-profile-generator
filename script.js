const inquirer = require('inquirer');
const fs = require('fs'),
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });

    convertFactory = require('electron-html-to');
 
var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});

var resume = 

conversion({ html: resume }, function(err, result) {
  if (err) {
    return console.error(err);
  }
 
  console.log(result.numberOfPages);
  console.log(result.logs);
  result.stream.pipe(fs.createWriteStream('/path/to/anywhere.pdf'));
  conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
});