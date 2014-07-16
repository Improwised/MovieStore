var fs = require("fs");
var path = "./Test/Resources/movies.dat";
var assert = require('assert');
var db = require("../parsers/config.js")
var file = require('../parsers/map.js')

describe('parsing movie file', function () {
    it('should parse the line', function () {
        file.parse(path, function (err, line) {

            //  console.log(line)
            assert.deepEqual(['3::Grumpier Old Men (1995)::Comedy|Romance',
                '4::Waiting to Exhale (1995)::Comedy|Drama|Romance'
            ], line);
        });
    });
    after(function(done){
      done();
    });
});

describe('creating database', function () {
    it('should create database', function (done) {
        file.save(path, function (err, value) {
            if (err) {
                return done(err)
            }
            db.movies.get(4, function (err, value) {
                if (err)
                    done(err)
                assert.equal(value, 'Waiting to Exhale (1995)::Comedy|Drama|Romance');
                done()
            })
        });

    });
    after(function(done){
      done();
    });
});


describe('mapping cat to movid', function () {
    it('should gives movies acc. to cat', function (done) {
        file.mapping(path, function (err, map) {
            if (err)
                return done(err)
            result = {
                Comedy: ['3', '4'],
                Romance: ['3', '4'],
                Drama: ['4']
             };
             //console.log(map.Comedy);
            assert.deepEqual(result, map)
            done()
        })
    });
    after(function(done){
      done();
    });
});
