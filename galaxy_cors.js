const fs = require('fs');
const path = require('path');

// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8181;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    httpsOptions: {
        key: fs.readFileSync(path.join(__dirname, 'certs/privkey.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'certs/fullchain.pem')),
    },
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
