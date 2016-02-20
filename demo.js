const https = require('https');

var config = require(process.env.HOME + '/.boxconfig.json');

var token = config.token;

var options = {
  hostname: 'api.dropboxapi.com',
  path: '/2/files/list_folder',
  method: 'POST',
  headers: {
    'User-Agent': 'box(github.com/olleicua/box)',
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
};

var req = https.request(options, function(res) {
  console.log('statusCode: ', res.statusCode);
  console.log('headers: ', res.headers);

  res.on('data', function(d) {
    process.stdout.write(d);
  });
});
req.write(JSON.stringify({path:''}));
req.end();

req.on('error', function(e) {
  console.error(e);
});
