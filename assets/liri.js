require("dotenv").config();

var Spotify = require("node-spotify-api");
var spotify = new Spotify({id:process.env.SPOTIFY_ID, secret:process.env.SPOTIFY_SECRET});
// var client = new Twitter(keys.twitter); 
//Still unable to get a API
var request = require("request");
var key = require("./keys")
var fs = require("fs");
var nodeArgs = process.argv;
var type = process.argv[2];
var type2 = "";
var twit = "my-tweets";
var spot = "spotify-this-song";
var movie = "movie-this";
var doThis = "do-what-it-says";

for (var i =3; i < nodeArgs.length; i++) {
    type2 = type2 + " " + nodeArgs[i];
  }


if (type === twit){
    //Twitter
    //Could not get the API

}else if (type === spot){
    //Spotify
    spotify.search({ type: 'track', query: type2, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var item = data.tracks.items;


        for (var i = 0; i < item.length; i++){
            console.log("Band: "+item[i].album.artists[0].name);
            console.log("Song: "+item[i].name);
            console.log("Preview: "+item[i].preview_url);
            console.log("Album: "+item[i].album.name);
        }

      });
}else if (type === movie){
    //OMDB
    request("http://www.omdbapi.com/?t="+ type2 + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        if (!error && response.statusCode === 200) {
      
          var parsedBody = JSON.parse(body);
          console.log("Title: "+ parsedBody.Title+
                    "\nRated: "+ parsedBody.Rated+
                    "\nYear: "+ parsedBody.Year+
                    "\nPlot: "+ parsedBody.Plot+
                    "\nThe movie's rating is: " + parsedBody.imdbRating);
        }
      });
      

}else if (type === doThis){
    //do-what-it-says
    console.log(doThis);
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
    });
}
