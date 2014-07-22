var db = require("../parsers/config.js");
var fs = require('fs');
var async = require("async");


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
    lines.pop();
    async.each(lines, function(line,callback){
      var splits = line.toString().split("::");
      var key = splits[0]+"!"+splits[1];
      var value = JSON.stringify({
        rating: splits[2],
        timestamp: splits[3]
      });
      db.ratings.put (key, value,callback);
    }, callback);


  });

  /*db.ratings.get("7!2",function(error,value){
    console.log(value);
  });*/
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

  }

  callback(null,count,avgOfRating);
};

module.exports.parseTags = require("./parseTags.js");
module.exports.saveAverageRatingOfMovie = require("./saveAverageRatingOfMovie.js");
module.exports.saveRatingsCountOfMovie = require("./saveRatingsCountOfMovie.js");
module.exports.mapMovieIdToRatings = require("./mapMovieIdToRatings.js");
