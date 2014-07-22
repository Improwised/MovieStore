/*global describe,it,before,after,beforeEach,afterEach,config,should*/

var chai = require('chai');
var should = chai.should();
var controller = require('../../web');

describe('Web Controller', function () {
  var server;

  before(function () {
    server = controller.server;
  });

  it ('should parse relative URLs', function (done) {
    var mockReq = {
      url: '/test'
    };
    var mockRes = {
      setHeaders: function (status, headers) {
        should.exist(status);
        status.should.equal(200);
      },
      end: function (response) {
        should.exist(response);
        response.should.equal('You have reached /test');
        done();
      }
    }

    server(mockReq, mockRes);
  });

  it ('should correctly parse URLs with trailing slashes', function (done) {
    var mockReq = {
      url: '/test/'
    };
    var mockRes = {
      setHeaders: function (status, headers) {
        should.exist(status);
        status.should.equal(200);
      },
      end: function (response) {
        should.exist(response);
        response.should.equal('You have reached /test');
        done();
      }
    }

    server(mockReq, mockRes);
  });

  it ('should parse relative URLs', function (done) {
    var mockReq = {
      url: '/test/42'
    };
    var mockRes = {
      setHeaders: function (status, headers) {
        should.exist(status);
        status.should.equal(200);
      },
      end: function (response) {
        should.exist(response);
        response.should.equal('You have reached /test with id 42');
        done();
      }
    }

    server(mockReq, mockRes);
  });
});