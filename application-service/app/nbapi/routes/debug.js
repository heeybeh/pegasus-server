/* jslint node:true */
'use strict';

module.exports = function indexRoutes(app) {
    var controller = require('../controllers/debug'),
        context = require('./middleware/context.js');
    
    app.get('/debug/', context.isDebugMode, controller.root);
};