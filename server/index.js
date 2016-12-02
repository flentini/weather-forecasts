const config = require('config');
const express = require('express');
const path = require('path');
const api = require('./api')(config);

const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('/forecasts/:cityId', (req, res, next) => {
    return api.getCityForecasts(req.params.cityId)
    .then((results) => {
        res.set('Content-Type', 'text/javascript');
        return res.send(results);
    })
});

app.listen(config.port, () => {
    console.log('listening on', config.port);
});
