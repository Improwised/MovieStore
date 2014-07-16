var assert = require('assert');
var fs = require("fs");
var math = require('./parsers/ratings');

describe("Math Module", function() {

  it('should parse the rating line', function (done) {

    var filepath = "/Users/isha/workspace/team3/MochaEx/ratings.txt";
    var eachline=math.parserating(filepath, done);
    //assert.equal(eachline[0],"1::1::5::838985046");

  });

  it('should save a rating database', function(done){

    var filepath = "/Users/isha/workspace/team3/MochaEx/ratings.txt";
    math.saveRatings(filepath, done);

  });

  it("should get data from rating db",function(){

    math.getrating("1!1");

  });

  it("should calculate count and average ratings for each movieId",function(done){

    math.countAndAverage({ '1': [ 5, 5 ],
      '2': [ 5, 5, 3, 3, 5 ],
      '3': [ 4, 5 ],
      '4': [ 2, 2 ],
      '5': [ 5 ],
      '6': [ 5 ],
      '7': [ 5 ],
      '8': [ 5 ],
      '9': [ 5 ]
      }, function(err,data){
      done();
    });

  });

});
