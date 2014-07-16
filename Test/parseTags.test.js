var assert = require("assert");
var parseTags = require("../parseTags.js");

describe("parseTags module", function() {

  it ("should parse input tag file", function() {

    parseTags("resources/tags.txt", function(error, data) {

      if (error) {

        throw error;
      }

      expectedData = [
        "12::1::tag 1::123123123",
        "12::2::tag 2::123123123",
        "12::3::tag 3::123123123",
        "12::4::tag 4::123123123",
        "12::5::tag 5::123123123",
        "12::9::tag 9::123123123",
        "20::1::tag 1::123123123",
        "20::3::tag 3::123123123",
        "20::7::tag 7::123123123",
        "20::6::tag 6::123123123",
        "13::1::tag 1.1::123123123",
        "13::1::tag 1.2::123123123"
      ];

      assert.deepEqual(data, expectedData);
    });
  });
});
