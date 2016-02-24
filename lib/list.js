filesize = require('filesize');

module.exports = function(path) {
  var app = require('./app.js');

  // ensure path is a string
  if (Object.prototype.toString.call(path) !==
      '[object String]') {
    path = '';
  }

  path = app.apiSanitisePath(path);

  app.apiRequest({
    path: '/2/files/list_folder',
    subdomain: 'api',
    contentType: 'application/json',
    data: { path: path },
    callback: function(data) {
      var i, entry, meta;

      data = JSON.parse(data);

      if (data.error) {
        console.error(data);
        return;
      }

      for (i = 0; i < data.entries.length; i++) {
        entry = data.entries[i];
        meta = '';

        if (entry['.tag'] === 'folder') {
          meta += '(dir)';
        }

        if (Object.prototype.toString.call(entry.size) ===
            '[object Number]') {
          meta += filesize(entry.size);
        }

        while (meta.length < 10) {
          meta += ' ';
        }

        console.log(meta + ' ' + entry.name);
      }

      if (data.has_more) {
        console.log('  * additional files elided *');
      }
    }
  });
};
