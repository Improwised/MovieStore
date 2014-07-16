var assert = require("assert");
var isNumber = require("../isNumber.js");

describe("isNumber module", function() {

  it ("should return false if passed argument is an empty string, undefined, null or any other not-a-number Value.", function() {

    assert.equal(isNumber(), false);
    assert.equal(isNumber(""), false);
    assert.equal(isNumber("ankur"), false);
    assert.equal(isNumber("5"), true);
    assert.equal(isNumber(5), true);
    assert.equal(isNumber(1.772453), true);
  });

});
