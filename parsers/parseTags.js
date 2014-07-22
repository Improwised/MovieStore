var fs = require("fs");
var isNumber = require("./isNumber");

module.exports = function(tagsFile, callback) {

  fs.readFile(tagsFile, function (error, data) {

    if (error) {

      return callback(error);
    }

    var lines = data.toString().split("\n");
    lines.pop();

    callback(null, lines);
  });
};
