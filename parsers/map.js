var db = require("../parsers/config.js")
var fs = require("fs");
var async = require('async')

exports.parse = function (path, callback) {
    fs.readFile(path, function (error, data) {
        if (error) {
            return callback(error);
        }

        var lines = data.toString().split("\n");
        lines.pop();
        //var len=lines.length;
        //  console.log(lines)
        callback(null, lines);
        //callback(null , len);

    });
};

exports.save = function (path, cb) {
    fs.readFile(path, function (error, data) {
        if (error) {
            return error
        }
        var films = data.toString().split('\n')
        films.pop();

        async.each(films, function (line, callback) {
            var film = line.split("::");
            var key = film[0];
            //console.log(key,films[j])
            var value = film[1] + "::" + film[2];
            db.movies.put(key, value);
            //console.log(key, value)
            callback();
        }, function (err) {
            if (err) {
                throw err;
            }
        });
    });
    cb();
}

exports.mapping = function (path, cb) {
        var movidcatmap = {};
        fs.readFile(path, function (error, data) {
          if (error) {
              return error
          }
          var films = data.toString().split('\n')
          films.pop();

          async.each(films, function (line, callback) {
            var splits = line.split("::")
            var movid = splits[0];
            var cat = splits[2]
            var movicat = cat.split("|")
                //  console.log(movicat[0]);
            for (var i = 0; i < movicat.length; i++) {
                if (movidcatmap[movicat[i]]) {

                    movidcatmap[movicat[i]].push(movid);
                    //console.log(movicat[i]+movidcatmap[movicat[i]])
                    db.genres.put(movicat[i], movidcatmap[movicat[i]])
                } else {

                    movidcatmap[movicat[i]] = [movid];
                    //console.log(movicat[i]+movidcatmap[movicat[i]])
                    db.genres.put(movicat[i], movidcatmap[movicat[i]])
                }

            }},
            function (err) {
                if (err) {
                    throw err;
                }
            }); cb(null, movidcatmap);
          });
  }
            /*

            exports.mapping = function (path, callback) {
                var movidcatmap = {};
                fs.readFile(path, function (error, data) {
                    if (error) {
                        return error
                    }
                    var films = data.toString().split('\n')
                    films.pop();

                    films.forEach(function (line) {
                        var splits = line.split("::")
                        var movid = splits[0];
                        var cat = splits[2]
                        var movicat = cat.split("|")
                            //  console.log(movicat[0]);
                        for (var i = 0; i < movicat.length; i++) {
                            if (movidcatmap[movicat[i]]) {

                                movidcatmap[movicat[i]].push(movid);
                                //console.log(movicat[i]+movidcatmap[movicat[i]])
                                db.genres.put(movicat[i], movidcatmap[movicat[i]])
                            } else {

                                movidcatmap[movicat[i]] = [movid];
                                //console.log(movicat[i]+movidcatmap[movicat[i]])
                                db.genres.put(movicat[i], movidcatmap[movicat[i]])
                            }

                        }
                    })
                    callback(null, movidcatmap);
                })
            }
            */
