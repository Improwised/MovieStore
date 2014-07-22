var path = require('path');
var url = require('url');

var router = require('node-simple-router')();

// Require controllers
var users = require('./users');
var movies = require('./movies');
var misc = require('./misc');

// Build an http server handler
exports.server = function (req, res) {
  // Require controllers and handle paths accordingly
  var currentUrl = url.parse(req.url, true);
  var path = currentUrl.pathname;
  var parsedPath = path.split('/');

  // Shift one for the leading slash
  parsedPath.shift();

  var controller = parsedPath.shift();
  var child = parsedPath.shift() || 'index';

  switch (controller) {
    case 'users':
      users[child](req, res, parsedPath);
      break;
    case 'movies':
      movies[child](req, res, parsedPath);
      break;
    default:
      if (child !== 'index') {
        parsedPath.unshift(child);
      }

      misc[controller](req, res, parsedPath);
  }
};


exports.readView = function (viewName, callback) {
  var viewPath = path.join(__dirname, 'views', viewName + '.html');
  fs.readFile(viewPath, callback);
};
