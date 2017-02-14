var request = require('request');
var GITHUB_USER = "torshore";
var GITHUB_TOKEN = "cdedbdb0ced15f7e64f1907dfc6225af4eb33aa8";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
   var options = {
     url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
     headers: {
       'User-Agent': 'request'
     }
   };
   request.get(options, function (error, response, body) {
     var data = JSON.parse(body);
     if (!error && response.statusCode == 200) {
        cb(data.forEach(function(user) {
        console.log(user.avatar_url);
      }));
     }
  });
}
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
})

