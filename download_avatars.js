var request = require('request');
var fs = require('fs');
var GITHUB_USER = "torshore";
var GITHUB_TOKEN = "cdedbdb0ced15f7e64f1907dfc6225af4eb33aa8";
var arg1 = process.argv.slice(2, 3)[0]; //repo owner
var arg2 = process.argv.slice(3, 4)[0]; //repo name

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  //options is necessary for github access (400 error will be received without)
   var options = {
     url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
     headers: {
       "User-Agent": "request"
     }
   };

   request.get(options, function (error, response, body) {

     if (!error && response.statusCode === 200) {
        cb(error, body);
     } else {
      return "You have an error!";
     }
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(arg1, arg2, function(err, result) {
  var data = JSON.parse(result);
  data.forEach(function(user) {
    downloadImageByURL(user.avatar_url, "./Avatars/" + user.login + ".jpg");
   });
});



