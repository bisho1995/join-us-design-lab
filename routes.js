var router = require('express').Router();

var index = require('./controller/index');
var register = require('./controller/register');
var login = require('./controller/login');



router.use('/', index);
router.use('/register', register);
router.use('/login', login);



module.exports = router;
