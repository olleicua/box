const https = require('https');

module.exports = function(options) {
  var app = require('./app.js');

  var httpsOptions = {
    hostname: 'api.dropboxapi.com',
    path: options.path,
    method: 'POST',
    headers: {
      'User-Agent': 'box(github.com/olleicua/box)',
      'Authorization': 'Bearer ' + app.config.token,
      'Content-Type': 'application/json'
    }
  };

  var req = https.request(httpsOptions, function(res) {
    var data = '';

    console.log('statusCode: ', res.statusCode);
    console.log('headers: ', res.headers);

    res.on('data', function(d) {
      data += d;
    });

    res.on('end', function() {
      options.success(data);
    });
  });

  req.write(JSON.stringify(options.data));
  req.end();

  req.on('error', function(e) {
    options.error(e);
  });
};
