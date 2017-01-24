/**
 * Share site via localtunnel
 */

import colors from 'colors'; // eslint-disable-line no-unused-vars
import localtunnel from 'localtunnel';

/* eslint-disable no-console */

const tunnel = localtunnel(3001, {subdomain: 'bschroerjson'},
    function(err, tunnel) {
        if (err) {
            console.log(err);
        } else {
            console.log(
                `Sharing http://localhost:3001 at ${tunnel.url}...`.bold.green);
        }
    }
);

tunnel.on('close', function() {
    console.log(`localtunnel closed.`.bold.green);
});
