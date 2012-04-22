var https = require('https');

module.exports = {
  checkFacebookToken: function (uid, token) {
        var options = {
           host: 'graph.facebook.com',
           port: 443,
           path: '/' + uid + '?access_token=' + token
        };

        var req = https.get(options, function(res2) {
                //console.log("Got response: " + res2.statusCode);
                res2.on('data', function(chunk) {
                        //console.log("Body: " + chunk);
                        return chunk;
                });
         }).on('error', function(chunk) {
		return false;
	});
	return false;
  },
  bar: function () {
    // whatever
  }
};
