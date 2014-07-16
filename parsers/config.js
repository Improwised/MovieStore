level = require('level')
db = level("./mydb")
sub = require('level-sublevel')
subdb = sub(db)
module.exports.movies = subdb.sublevel('movies');
module.exports.genres = subdb.sublevel('genres');
