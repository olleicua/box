module.exports = {
  get: function(key) {
    var app = require('./app.js');
    app.cache.revs = app.cache.revs || {};
    return app.cache.revs[key];
  },
  set: function(key, value) {
    var app = require('./app.js');
    app.cache.revs = app.cache.revs || {};
    app.cache.revs[key] = value;
    app.writeCache();
  }
};
