var router = require('express').Router();
var registerUser = require('./register/RegisterUser');

router.get('/', (req, res, next)=>{
    res.status(200).render('register');
});

router.post('/', registerUser.registerUser);


module.exports = router;