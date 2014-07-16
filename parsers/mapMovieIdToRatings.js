var config = require("./config.js");
var isNumber = require("./isNumber");

module.exports = function(linesContainingRatings, callback) {

  var movieIdToRatingsMap = {};

  linesContainingRatings.forEach(function(line) {

    var splits = line.split("::");

    var userId = splits[0];
    var movieId = splits[1];
    var rating = splits[2];
    var timestamp = splits[3];

    if (!isNumber(movieId) || !isNumber(rating) || !isNumber(userId) || !isNumber(timestamp)) {

      return callback(new Error("Number expected."));
    }

    if (movieIdToRatingsMap[movieId]) {

      movieIdToRatingsMap[movieId].push(+rating);

    } else {

      movieIdToRatingsMap[movieId] = [+rating];
    }
  });

  callback(null, movieIdToRatingsMap);
}
