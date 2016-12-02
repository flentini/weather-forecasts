'use strict';

const config = require('config');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const request = require('request');

// OpenWeatherMap API Endpoint
const OPENWEATHERMAP_API_URL = 'http://api.openweathermap.org/data/2.5/forecast/city';

const citiesCache = new require('async-cache')({
    max: config.cache.max,
    maxAge: config.cache.maxAge,
    load: (cityId, callback) => {
        request(`${OPENWEATHERMAP_API_URL}?APPID=${process.env.OPENWEATHERMAP_KEY}&id=${cityId}`, (err, res, body) => {
            if (err) {
                callback(err);
            } else {
                callback(null, JSON.parse(body));
            }
        });
    }
});

/**
* Gets forecasts by city id
*
* @param {String|Number} cityId
*/
const getCityForecasts = (cityId) => {

    return new Promise((resolve, reject) => {
        citiesCache.get(cityId, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

const app = express();

//TODO setup proper production logging
app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '../build')));

app.get('/forecast/:cityId', (req, res, next) => {
    return getCityForecasts(req.params.cityId)
    .then((results) => {
        res.set('Content-Type', 'text/javascript');
        return res.send(results);
    })
});

app.listen(config.port, () => {
    console.log('Listening on', config.port);
});
