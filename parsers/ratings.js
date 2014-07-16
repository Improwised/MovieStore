var db = require("../parsers/config.js");
var fs = require('fs');


exports.parserating = function ( filepath, callback ) {
  fs.readFile ( filepath, function (error, data){
    if (error) {
      return callback(error);
    }

    var lines = data.toString().split("\n");
    callback(null , lines);
  });
};

exports.saveRatings = function ( filepath, callback ) {

  fs.readFile ( filepath, function ( error, data ) {
    if (error) {
      return callback(error);
    }

    var lines = data.toString().split("\n");
    var splits = lines.toString().split("::");
    var key = splits[0]+"!"+splits[1];
    var value = JSON.stringify({
      rating: splits[2],
      timestamp: splits[3]
    });

    db.ratings.put (key, value, function() {

      callback(null , lines);
    });
  });
};

exports.countAndAverage = function ( map,callback ) {
  var addOfRating = 0;
  var ratingarr;
  var count;
  for(var movieid in map){
    if(map.hasOwnProperty(movieid)){
      addOfRating = 0;
      ratingarr = map[movieid];
      count = ratingarr.length;
    }
    ratingarr.forEach( function(data) {
      addOfRating = addOfRating + parseInt(data);
    });
    var avgOfRating = addOfRating/count;
    console.log("movieid: "+ movieid + " == totalcounts: "+ count + ", averating:" + avgOfRating);
  }

  callback();
};

module.exports.parseTags = require("./parseTags.js");
module.exports.saveAverageRatingOfMovie = require("./saveAverageRatingOfMovie.js");
module.exports.saveRatingsCountOfMovie = require("./saveRatingsCountOfMovie.js");
module.exports.mapMovieIdToRatings = require("./mapMovieIdToRatings.js");
