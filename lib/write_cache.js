var fs = require('fs');

module.exports = function() {
  var app = require('./app.js');

  fs.writeFile(
    process.env.HOME + '/.boxcache.json',
    JSON.stringify(app.cache, null, 2)
  );
};
