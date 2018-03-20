var router = require('express').Router();

var loginUser = require('./login/loginUser');

router.get('/', (req, res, next)=>{
    res.render('login');
});


router.post('/', loginUser.loginUser);

module.exports = router;