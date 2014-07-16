var assert = require("assert");
var saveRatingsCountOfMovie = require("../saveRatingsCountOfMovie.js");

var config = require("../config.js");
var db = config.ratingCountOfMovieId;

describe("saveRatingsCountOfMovie module", function() {

  it ("should save ratings count of a movie", function(callback) {

    saveRatingsCountOfMovie(1, 20, function(error, data) {

      if (error) {

        return callback(error);
      }

      db.get(1, function(error, value) {

        if (error) {

          return callback(error);
        }

        assert.equal(value, 20);
        callback();
      });
    });
  });

  it ("should throw an error", function(callback) {

    saveRatingsCountOfMovie(1, "2o7", function(error, data) {

      if (error) {

        return callback();
      }

      callback(new Error("Module is defective."));
    });
  });

  after(function(callback) {

    db.del(1, callback);
  });
});
