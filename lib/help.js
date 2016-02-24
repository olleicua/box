module.exports = function() {
  console.log('Usage: box COMMAND ARGS...');
  console.log('Commands (can be abbreviated (e.g. box l)):');
  console.log('  box init TOKEN : set API token (see github.com/olleicua/box)');
  console.log('  box list [path] : list contents a directory');
  console.log('  box download remote-path [local-path] : download a file');
  console.log('  box upload local-path remote-path : upload a file');
  console.log('  box help : this message');
};
