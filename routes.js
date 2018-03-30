var router = require('express').Router();

var index = require('./controller/index');
var register = require('./controller/register');
var login = require('./controller/login');
var findCounselor = require('./controller/findcounselor');
var admindashboard = require('./controller/admindashboard');
var registerPeerMotivator = require('./controller/admindashboard/registerpeermotivator');


router.use('/', index);
router.use('/register', register);
router.use('/login', login);
router.use('/client-dashboard/find-counselor', findCounselor);
router.use('/admin-dashboard', admindashboard);
router.use('/admin-dashboard/register-peer-motivator', registerPeerMotivator);



module.exports = router;
