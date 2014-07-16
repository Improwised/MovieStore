var config = require("./config.js");
var isNumber = require("./isNumber");

var db = config.averageRatingOfMovieId;

module.exports = function(movieId, averageRating, callback) {

  if (!isNumber(movieId) || !isNumber(averageRating)) {

    return callback(new Error("Number expected."));
  }

  db.put(movieId, averageRating, callback);
}
