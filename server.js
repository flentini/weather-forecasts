'use strict';

const config = require('config');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const request = require('request');

// OpenWeatherMap API Endpoint
const OPENWEATHERMAP_API_URL = 'http://api.openweathermap.org/data/2.5/forecast/city';

// Let's use OpenWeatherMap icons
const OPENWEATHERMAP_ICON_URL = 'http://openweathermap.org/img/w/';

const citiesCache = new require('async-cache')({
    max: config.cache.max,
    maxAge: config.cache.maxAge,
    load: (cityId, callback) => {
        request(`${OPENWEATHERMAP_API_URL}?APPID=${process.env.OPENWEATHERMAP_KEY}&id=${cityId}&units=metric`, (err, res, body) => {
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
    }).then((data) => {
        return {
            city: data.city.name,
            country: data.city.country,
            list: data.list.reduce((acc, value) => {
                const weather = value.weather[0];
                weather.date = value.dt;
                weather.date_txt = value.dt_txt;
                weather.image = `${OPENWEATHERMAP_ICON_URL}${weather.icon}.png`;

                acc.push(weather);

                return acc;
            }, [])
        };
    });
}

const app = express();

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
