/**
 * Share site via localtunnel
 */

import colors from 'colors'; // eslint-disable-line no-unused-vars
import localtunnel from 'localtunnel';
import config from './config';

/* eslint-disable no-console */

const port = config.getPort();

const tunnel = localtunnel(port, {subdomain: 'bschroercc'},
    function(err, tunnel) {
        if (err) {
            console.log(err);
        } else {
            console.log(
                `Sharing http://localhost:${port} at ${tunnel.url}...`.bold.green);
        }
    }
);

tunnel.on('close', function() {
    console.log(`localtunnel closed.`.bold.green);
});
