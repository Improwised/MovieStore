var assert = require("assert");
var saveAverageRatingOfMovie = require("../saveAverageRatingOfMovie.js");

var config = require("../config.js");
var db = config.averageRatingOfMovieId;

describe("saveAverageRatingOfMovie module", function() {

  it ("should save average rating of a movie", function(callback) {

    saveAverageRatingOfMovie(1, 3.4, function(error, data) {

      if (error) {

        return callback(error);
      }


      db.get(1, function(error, value) {

        if (error) {

          return callback(error);
        }

        assert.equal(+value, 3.4);
        callback();
      });
    });
  });

  it ("should throw an error", function(callback) {

    saveAverageRatingOfMovie(1, "3.4a", function(error, data) {
      assert.ok(error);
      callback();
    });
  });

  after(function(callback) {

    db.del(1, callback);
  });
});
