module.exports = function(path) {
  var app = require('./app.js');

  // ensure slash at begining
  path = path.replace(/^([^\/])/, '/$1');

  // ensure no slash at end
  path = path.replace(/\/$/, '');

  app.apiRequest({
    path: '/2/files/list_folder',
    data: {path: path},
    success: function(data) {
      process.stdout.write(data);
    },
    error: function(error) {
      console.log(error);
    }
  });
};
