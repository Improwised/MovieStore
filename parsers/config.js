var level = require( 'level');
var sub = require ( 'level-sublevel' );
var subdb = sub ( level ( "./db" ));
module.exports.ratingdb = subdb.sublevel( 'ratings' );
