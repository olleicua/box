filesize = require('filesize');

module.exports = function(path) {
  var app = require('./app.js');

  // ensure slash at begining
  path = path.replace(/^([^\/])/, '/$1');

  // ensure no slash at end
  path = path.replace(/\/$/, '');

  app.apiRequest({
    path: '/2/files/list_folder',
    data: { path: path },
    success: function(data) {
      var i, entry, meta;
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
