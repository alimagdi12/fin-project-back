const http = require('http');
const geoip = require('geoip-lite');

const getPublicIpMiddleware = (req, res, lang, next) => {
    http.get('http://api.ipify.org', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            req.publicIp = data.trim(); // Trim to remove whitespace

            // Get location details based on the public IP
            const geo = geoip.lookup(req.publicIp);
            req.location = geo;

            next();
        });
    }).on('error', (err) => {
        console.error('Error getting public IP:', err);
        next(err);
    });
};

exports.getPublicIpMiddleware = getPublicIpMiddleware;
