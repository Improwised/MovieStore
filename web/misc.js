exports.index = function (req, res, trailingPath) {
  if (trailingPath.length === 0) {
    // 404
    res.setHeaders(404, {
      'Content-Type': 'text/html',
    });
    res.end('<h1>Page not found</h1>');
  } else {
    // Implement something, if applicable. Otherwise keep it 404 as well
    res.setHeaders(404, {
      'Content-Type': 'text/html',
    });
    res.end('<h1>Page not found</h1>');
  }
}

// Routes for testing
exports.test = function (req, res, trailingPath) {
  if (trailingPath.length === 0) {
    // /test
    res.setHeaders(200, {
      'Content-Type': 'text/plain',
    });
    res.end('You have reached /test');
  } else {
    var id = trailingPath.slice();
    // /test/:id
    res.setHeaders(200, {
      'Content-Type': 'text/plain',
    });
    res.end('You have reached /test with id ' + id);
  }
};