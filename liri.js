//request module
fs = require("fs");
//mod line from js
var exec = require('child_process').exec;

//Twitter set up
var keys = require("./keys.js");
var tKeys = keys.twitterKeys;
var Twitter = require('twitter'); 
var client = new Twitter({
  consumer_key: tKeys.consumer_key,
  consumer_secret: tKeys.consumer_secret,
  access_token_key: tKeys.access_token_key,
  access_token_secret: tKeys.access_token_secret
});
var params = {screen_name: 'makhnovsdog'};
//Call to pull my tweets
function twitCall() {
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for ( i in tweets) {
        console.log("Tweet: "+tweets[i].text+"\nCreated at: "+tweets[i].created_at+"\n\n");
    }
  }
});
};

//spotify set up
var spotify = require('spotify');

 //call to search by track name and print
function spotCall(track) {
    spotify.search({ type: 'track', query: track }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    //print track name, album, artist, preview url
    console.log("track: "+data.tracks.items[0].name+"\n");
    console.log("album: "+data.tracks.items[0].album.name+"\n");
    console.log("artist: "+data.tracks.items[0].artists[0].name+"\n");
    console.log("preview: "+data.tracks.items[0].preview_url);
    
});
};
//  Title of the movie.
//     * Year the movie came out.
//     * IMDB Rating of the movie.
//     * Country where the movie was produced.
//     * Language of the movie.
//     * Plot of the movie.
//     * Actors in the movie.
//     * Rotten Tomatoes Rating.
//     * Rotten Tomatoes URL.

const imdb = require('imdb-api');


//movie function
function movieCall(title) {
    imdb.getReq({ name: title }, (err, things) => {
    movie = things;
    console.log("Title: "+movie.title+"\n");
    console.log("Year: "+movie.year+"\n");
    console.log("Rating: "+movie.rating+"\n");
    console.log("Country: "+movie.country+"\n");
    console.log("Language(s): "+movie.languages+"\n");
    console.log("Plot: "+movie.plot+"\n");
    console.log("Actors: "+movie.actors+"\n");
});
}


//read node mod line input and decide which module to run
var mod = process.argv[2];


if (mod === 'my-tweets') {
    twitCall();
}
else if (mod ==='spotify-this-song') {
    //combine user input into string then search
    title = process.argv.slice(3,process.argv.length).join(" ");
    if (title === undefined || title.length === 0) {
        title = "The Sign Ace of Base";
    }
    
    spotCall(title);

}
else if (mod === 'movie-this') {
    title = process.argv.slice(3,process.argv.length).join("&");
    if (title === undefined || title.length === 0) {
        title = "Mr. Nobody";
    }
    // console.log(title);
    movieCall(title);
}
else if (mod ==='do-what-it-says') {
    //read txt file and split cmd from param
    fs.readFile('random.txt',"UTF-8", (err, data) => {
    if (err) throw err;
    data = data.split(",");
    //create bash cmd and run
    var cmd = "node liri.js "+data[0]+" "+data[1];
    console.log(cmd);

    exec(cmd, function(error, stdout, stderr) {
  // command output is in stdout
  console.log(stdout);
});
});
}


