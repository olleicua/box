module.exports = function(path) {
  return path.replace(/^([^\/])/, '/$1').replace(/\/$/, '');
};
