var request = require('superagent');

module.exports = function(url, cb) {
  request.get(url).end(function(err, res) {
    if (err) return cb(err);
    return cb(null, res.body);
  });
};
