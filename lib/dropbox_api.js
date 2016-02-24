const https = require('https');

module.exports = function(options) {
  var app = require('./app.js');

  var httpsOptions = {
    hostname: options.subdomain + '.dropboxapi.com',
    path: options.path,
    method: 'POST',
    headers: {
      'User-Agent': 'box(github.com/olleicua/box)',
      'Authorization': 'Bearer ' + app.cache.token
    }
  };

  if (options.apiArg) {
    httpsOptions.headers['Dropbox-API-Arg'] =
      JSON.stringify(options.apiArg);
  }

  if (options.contentType) {
    httpsOptions.headers['Content-Type'] = options.contentType;
  }

  var req = https.request(httpsOptions, function(res) {
    var data = '';

    res.on('data', function(d) {
      data += d;
    });

    res.on('end', function() {
      options.callback(data);
    });
  });

  if (options.data) {
    req.write(JSON.stringify(options.data));
  }
  req.end();

  req.on('error', function(e) {
    console.error(e);
  });
};