'use strict';

const fetch = require('node-fetch');
const clientKey = process.env.LOCATION_API_KEY;

module.exports = (zipCode) => {
    return fetch('https://www.zipcodeapi.com/rest/' + clientKey + '/info.json/' + zipCode + '/degrees')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
};