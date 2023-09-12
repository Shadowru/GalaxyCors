const fs = require('fs');
const path = require('path');

require('dotenv').config()

const host_name = process.env.HUBS_HOST || 'galaxy.1936.moscow';

// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8181;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    httpsOptions: {
        key: fs.readFileSync('/etc/letsencrypt/live/' + host_name + '/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/' + host_name + '/cert.pem'),
    },
    originWhitelist: [],
    requireHeader: ['origin', 'referer'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port + '(' + host_name + ')');
});
