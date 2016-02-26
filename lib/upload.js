var fs = require('fs');

module.exports = function(localPath, remotePath) {
  var app = require('./app.js');

  if (Object.prototype.toString.call(localPath) !==
      '[object String]' ||
      Object.prototype.toString.call(remotePath) !==
      '[object String]') {
    console.log('Usage: box upload path/to/local/file ' +
                'path/to/remote/file');
    return;
  }

  remotePath = app.apiSanitisePath(remotePath);

  var rev = app.revs.get(remotePath);
  var apiArg = { path: remotePath };

  if (rev) {
    apiArg.mode = { ".tag": "update", update: rev };
    apiArg.autorename = true;
  }

  fs.readFile(localPath, function(e, data) {
    if (e) throw e;

    app.apiRequest({
      path: '/2/files/upload',
      subdomain: 'content',
      contentType: 'application/octet-stream',
      apiArg: apiArg,
      data: data.toString(),
      callback: function(d) {}
    });
  });
};
