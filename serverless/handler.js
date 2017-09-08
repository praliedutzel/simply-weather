'use strict';

const getCoords = require('./lib/location');
const getForecast = require('./lib/forecast');

const RateLimiter = require('limiter').RateLimiter;
const limiter = new RateLimiter(40, 'hour');

let city;
let state;

module.exports.weather = (event, context, callback) => {
    limiter.removeTokens(1, (err, remainingRequests) => {
        if ( remainingRequests < 1 ) {
            const error = {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    'error': 'Too many requests'
                })
            };
            callback(null, error);
        } else {
            getCoords(event.queryStringParameters.zip)
            .then((data) => {
                city = data.city;
                state = data.state;
                return getForecast(data.lat, data.lng);
            })
            .then((data) => {
                const response = {
                    statusCode: 200,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify({
                        'city': city,
                        'state': state,
                        'currently': data.currently.summary,
                        'icon': data.currently.icon,
                        'temperature': Math.round(data.currently.temperature),
                        'humidity': Math.round(data.currently.humidity*100),
                        'wind': Math.round(data.currently.windSpeed)
                    })
                };

                callback(null, response);
            })
            .catch((error) => {
                console.log('Error: ', error);
                callback(error, null);
            });
        }
    });
};
