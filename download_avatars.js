var request = require('request');
var fs = require('fs');
var GITHUB_USER = "torshore";
var GITHUB_TOKEN = "cdedbdb0ced15f7e64f1907dfc6225af4eb33aa8";
var ownerRepo = process.argv.slice(2, 3)[0]; //repo owner
var nameRepo = process.argv.slice(3, 4)[0]; //repo name

//error message thrown if 2 args not input
function UserError(message){
    this.message = message;
    console.log(message);
}

if (!ownerRepo || !nameRepo){
    throw new UserError("Please provide input in the following format: node download_avatars.js <owner>repository>");
}
//cb is called in this function
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
// pulls images from URLs and puts into Avatar folder
function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}
//contains callback function
getRepoContributors(arg1, arg2, function(err, result) {
  var data = JSON.parse(result);
  data.forEach(function(user) {
    downloadImageByURL(user.avatar_url, "./Avatars/" + user.login + ".jpg");
  });
});



