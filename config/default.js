'use strict';

module.exports = {
    // Port the application is running on
    port: 3003,
    cache: {
        // how many objects keep in cache
        max: 1000,
        maxAge: 1000 * 60 * 10  // 10min
    }
};
