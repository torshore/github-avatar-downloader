var request = require('request');
var fs = require('fs');
var GITHUB_USER = "torshore";
var GITHUB_TOKEN = "cdedbdb0ced15f7e64f1907dfc6225af4eb33aa8";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

   var options = {
     url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
     headers: {
       'User-Agent': 'request'
     }
   };

   request.get(options, function (error, response, body) {

     if (!error && response.statusCode == 200) {
        cb(error, body);
     }
  });
}
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var data = JSON.parse(result);
  var array = [];
  data.forEach(function(user) {
    array.push(user.avatar_url);
});
  console.log(array);
});

function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream('./${filepath}.jpg'));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./kvirani.jpg")