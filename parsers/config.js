var level = require( 'level');
var sub = require ( 'level-sublevel' );
var db = sub ( level ( "./db" ));
module.exports.ratings = db.sublevel( 'ratings' );
module.exports.movies = db.sublevel('movies');
module.exports.genres = db.sublevel('genres');
module.exports.averageRatingOfMovieId = db.sublevel("averageRatingOfMovieId");
module.exports.ratingCountOfMovieId = db.sublevel("ratingCountOfMovieId");
