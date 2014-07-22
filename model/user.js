var db = require("../parsers/config.js");



exports.movielist = function (userid, callback) {
    var movielists = [];
    var counter = 0;
    db.ratings.createReadStream({
            start: userid,
            end: userid + '\xff'
        })
        .on('data', function (data) {
            rat = data.key.split("!");
            db.movies.createReadStream({
                    start: rat[1],
                    end: rat[1] + '\xff'
                })
                .on('data', function (movie) {
                    movielists.push(JSON.parse(movie.value).movie_title);
                    counter++;
                })
        })
        .on('close', function () {
            if (callback) {
                callback(null, movielists)
                console.log("Movies seen by user " + userid + " are :" + counter)
            }
            callback = null
        })
}
