/*
This script generates mock data for local development.
This way you don't have to point to an actual API,
but you can enjoy realistic but randomized data
and rapid page loads due to local, static data.
*/

/* eslint-disable no-console */

import colors from 'colors'; // eslint-disable-line no-unused-vars
import fs from 'fs';
import jsonSchemaFaker from 'json-schema-faker';
import path from 'path';
import {schema} from './mockDataSchema';

 console.log(
    `Using json-schema-faker to generate data for schema:
            ${path.join(__dirname, './mockDataSchema')}...`.green);

const mockData = jsonSchemaFaker(schema);

const json = JSON.stringify(mockData, null, /*indent:*/ 4);
const outputPath = path.join(__dirname, './mockData.json');

fs.writeFile(outputPath, json, function(err) {
    if (err) {
        return console.log(err.red);
    } else {
        console.log(
            `Mock data was generated and saved to
            ${outputPath}.`.green);
    }
});
