var config = require("./config.js");
var isNumber = require("./isNumber");

var db = config.ratingCountOfMovieId;

module.exports = function(movieId, ratingCount, callback) {

  if (!isNumber(movieId) || !isNumber(ratingCount)) {

    return callback(new Error("Number expected."));
  }

  db.put(movieId, ratingCount, callback);
}
