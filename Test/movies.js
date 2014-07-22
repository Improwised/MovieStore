var fs = require("fs");
var path = "./Test/Resources/movies.txt";
var assert = require('assert');
var db = require("../parsers/config.js")
var file = require('../parsers/movies.js')
var listfile = require('../model/user.js')

describe('parsing movie file', function () {
    it(' should parse the line', function () {
        file.parse(path, function (err, line) {

            //  console.log(line)
            assert.deepEqual(['1::Toy Story (1995)::Adventure|Animation|Children|Comedy|Fantasy', '2::Jumanji (1995)::Adventure|Children|Fantasy', '3::Grumpier Old Men (1995)::Comedy|Romance',
                '4::Waiting to Exhale (1995)::Comedy|Drama|Romance'
            ], line);
        });
    });

    it('should create database', function (done) {
        file.save(path, function (err, value) {
            if (err) {
                return done(err)
            }
            db.movies.get(4, function (err, value) {
                if (err)
                    done(err)
                assert.equal(value, '{\"movie_title\":\"Waiting to Exhale (1995)\",\"genres\":[\"Comedy\",\"Drama\",\"Romance\"]}');
                done()
            })
        });

    });

    it('should gives movies acc. to cat', function (done) {
        file.mapping(path, function (err, map) {
            if (err)
                return done(err)
            result = {

                Adventure: ["1", "2"],
                Animation: ["1"],
                Children: ["1", "2"],
                Comedy: ["1", "3", "4"],
                Fantasy: ["1", "2"],
                Romance: ["3", "4"],
                Drama: ['4']
            };
            //console.log(map.Comedy);
            assert.deepEqual(result, map)
            done()
        })
    });

    it('should gives list of movies acc. to userid', function (done) {
        listfile.movielist('1', function (err, list) {
            if (err)
                return done(err)
            result = [
                'Toy Story (1995)',
                'Grumpier Old Men (1995)'
            ];
            console.log(list);
            assert.deepEqual(result, list)
            done()
        })
    });

    after(function (done) {
        done();
    });
});
