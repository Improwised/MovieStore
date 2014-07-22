var movieModule = require("../parsers/map.js");
var ratingModule = require("../parsers/ratings.js");
var async = require("async");

switch ( process.argv[2] ) {
  case '-i':
    if ( process.argv.length === 6){
      if ( isNaN(process.argv[3])  && isNaN(process.argv[4]) && isNaN(process.argv[5])){
        async.parallel([
          function(callback){
            ratingModule.saveRatings(process.argv[5], function(error){
              if ( error ){
                return callback(error);
              }
              console.log("completed ratings database");
              callback();

            });
          },
          function(callback){
            movieModule.save(process.argv[3], function(error){
              if ( error ){
                return callback(error);
              }
              console.log("completed movies database");
              callback();

            });
          }
        ],
        function(error){
          if(error){
            console.log(error);
            throw error;
          }

        });
      }
    }
    else {
      console.log("Enter valid arguments.");
    }
    break;
  case '-u':
    if ( isNaN(process.argv[3]) === false ){
      switch ( process.argv[4] ) {
        case '--movies' :
          // fetch movies seen by user
          break;
        case '--tags':
          break;
        default :
          console.log("Display list of movies rated or tagged by specified user");
          console.log("-u <user_id> (--movies | --tags)");
          break;
      }
    }
    else{
      console.log("Display list of movies rated or tagged by specified user");
      console.log("-u <user_id> (--movies | --tags)");
    }
    break;
  case '-m':
    switch ( process.argv[3] ) {
      case '--popular' :

        if ( process.argv[4] === '-n') {
          if ( isNaN(process.argv[5]) === false ) {
            //
          }
          else {

            console.log("Please enter value in this format to see popular movie:")
            console.log("(-m --popular) [-n <number_of_ratings>]");
          }
        }
        else {
            //
        }
        break;
      case '--best':
        if ( process.argv[4] === '-n') {
          if ( isNaN(process.argv[5]) === false ) {
            //
          }
          else {
            console.log("Please enter value in this format to see best rated movie:")
            console.log("(-m --best) [-n <number_of_ratings>]");
          }
        }
        else {
            //
        }
        break;
      default:
        console.log("Display n number of most popular (most rated on) or best rated (highest average rating) movies");
        console.log("-m (--popular | --best) [-n <number_of_ratings>]");
        break;
    }
    break;
  default:
    console.log("Import MovieLens dataset");
    console.log("-i <movies_file> <tags_file> <ratings_file>");
    console.log(" Display list of movies rated or tagged by specified user");
    console.log("-u <user_id> (--movies | --tags)");
    console.log("Display n number of most popular (most rated on) or best rated (highest average rating) movies");
    console.log("-m (--popular | --best) [-n <number_of_ratings>]");
    break;
}
