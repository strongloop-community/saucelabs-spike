var http = require('http');
var connect = require('connect');

function start(cb) {
  var app = connect();

  // Enable CORS
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
  });

  // Request handler
  app.use(function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ ok: true }, null, 2));
  });

  http.createServer(app)
    .on('error', cb)
    .listen(3000, function() {
      console.log('Listening on port 3000');
      cb();
    });
}

exports.start = start;

if (require.main === module) {
  start(function() {});
}
