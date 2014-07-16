var level = require( 'level');
var sub = require ( 'level-sublevel' );
var subdb = sub ( level ( "./db" ));
module.exports.ratings = subdb.sublevel( 'ratings' );
module.exports.movies = subdb.sublevel('movies');
module.exports.genres = subdb.sublevel('genres');
