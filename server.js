'use strict';

const config = require('config');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const request = require('request');

// port the app listens to
const PORT = process.env.PORT || config.port;

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
* Gets forecasts by city id and maps the response into a model
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
                const day = acc[value.dt_txt.substr(0, 10)] || (acc[value.dt_txt.substr(0, 10)] = { hours: [] });
                const weather = value.weather[0];

                weather.date = value.dt;
                weather.date_txt = value.dt_txt;
                weather.image = `${OPENWEATHERMAP_ICON_URL}${weather.icon}.png`;
                weather.temp = value.main.temp;

                day.hours.push(weather);

                return acc;
            }, {})
        };
    });
}

const app = express();

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, '/build')));

app.get('/forecast/:cityId', (req, res, next) => {
    return getCityForecasts(req.params.cityId)
    .then((results) => {
        res.set('Content-Type', 'text/javascript');
        return res.send(results);
    })
});

app.get('/health', (req, res, next) => {
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log('Listening on', PORT);
});

module.exports = app;
