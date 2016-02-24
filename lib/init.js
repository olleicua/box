module.exports = function(token) {
  var app = require('./app.js');

  app.cache.token = token;
  app.writeCache();
};
