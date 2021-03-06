'use strict'
var router = require('express').Router();

/**
* only routes one level deep are written here
*/

var index = require('./controller/index');
var register = require('./controller/register');
var login = require('./controller/login');
var admindashboard = require('./controller/admindashboard');
var clientdashboard = require('./controller/clientdashboard')
var pmdashboard = require('./controller/peermotivatordashboard')



router.use('/', index);
router.use('/register', register);
router.use('/login', login);
router.use('/admin-dashboard', admindashboard);
router.use('/client-dashboard', clientdashboard);
router.use('/peermotivator-dashboard', pmdashboard);





module.exports = router;
