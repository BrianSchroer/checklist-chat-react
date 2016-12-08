import fs from 'fs';
import cheerio from 'cheerio';
import colors from 'colors'; // eslint-disable-line no-unused-vars

/* eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
    if (err) {
        return console.log(err);
    }

    const $ = cheerio.load(markup);

    // dynamically insert separate spreadsheet for production:
    $('head').prepend('<link rel="stylesheet" href="styles.css">');

    fs.writeFile('dist/index.html', $.html(), 'utf8', (err) => {
        if (err) {
            return console.log(err);
        }

        console.log('index.html written to /dist'.green);
    });
});
