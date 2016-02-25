module.exports = {
  cache: (function() {
    try {
      return require(process.env.HOME + '/.boxcache.json');
    } catch (e) {
      return {};
    }
  })(),
  writeCache: require('./write_cache.js'),
  apiRequest: require('./dropbox_api.js'),
  apiSanitisePath: require('./sanitise_path.js'),
  commands: {
    init: require('./init.js'),
    list: require('./list.js'),
    download: require('./download.js'),
    upload: require('./upload.js'),
    help: require('./help.js')
  }
};
