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

    db.ratingdb.put (key, value, function() {

      callback(null , lines);
    });
  });
};

exports.getrating = function ( key ) {
  db.ratingdb.get("1!1", function(error,data){
    console.log("getdata");
    if ( error ) {
      return console.log(error);
    }
    console.log(data);
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
