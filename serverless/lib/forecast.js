'use strict';

const fetch = require('node-fetch');
const apiKey = process.env.DARKSKY_API_KEY;
const excludeFields = 'minutely,hourly,daily,flags,alerts';

module.exports = (latitude, longitude) => {
    return fetch('https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude + '?exclude=' + excludeFields)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            return data;
        });
};