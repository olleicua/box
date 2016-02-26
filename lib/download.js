var fs = require('fs');
var path = require('path');

module.exports = function(remotePath, localPath) {
  var app = require('./app.js');

  if (Object.prototype.toString.call(remotePath) !==
      '[object String]') {
    console.log('Usage: box download path/to/file');
    return;
  }

  remotePath = app.apiSanitisePath(remotePath);

  localPath = localPath || path.basename(remotePath);

  app.apiRequest({
    path: '/2/files/download',
    subdomain: 'content',
    apiArg: { path: remotePath },
    callback: function(data, apiResult) {
      fs.writeFile(localPath, data);
      app.revs.set(apiResult.path_lower, apiResult.rev);
    }
  });
};
