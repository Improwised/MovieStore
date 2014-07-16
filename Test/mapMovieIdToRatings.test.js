var assert = require("assert");
var mapMovieIdToRatings = require("../mapMovieIdToRatings.js");

describe("mapMovieIdToRatings module", function() {

  it ("should return a map of movie id to ratings", function() {

    mapMovieIdToRatings([
        "1::1::2.5::123123123",
        "1::2::3.5::123123124",
        "2::1::2.5::123123123",
        "3::2::4.5::123123123"
      ], function(error, map) {

        if (error) {

          throw error;
        }

        expectedMap = {

          1: [2.5, 2.5],
          2: [3.5, 4.5]
        };

        assert.deepEqual(expectedMap, map);
    });
  });
});
