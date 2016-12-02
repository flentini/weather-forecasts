'use strict';

const request = require('request');

module.exports = (config) => {
    const citiesCache = new require('async-cache')({
        max: config.cache.max,
        maxAge: config.cache.maxAge,
        load: () => {

        }
    });

    const getCityForecasts = (cityId) => {

        return new Promise((resolve, reject) => {
            resolve({
                city: 'London',
                details: []
            });
        });
    }

    return {
        getCityForecasts: getCityForecasts
    };
};
