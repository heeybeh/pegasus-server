/* jslint node:true */
'use strict';

module.exports = function indexRoutes(app) {
    var index = require('../controllers/index');
    
    app.all('*', index.hit);
    app.get('/', index.root);
};