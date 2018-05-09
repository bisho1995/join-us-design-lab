var router = require('express').Router();
var registerUser = require('./register/RegisterUser');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const expressValidator = [
    check('email')
        .isEmail()
        .withMessage('must be an email'),
    check('password', 'Not a valid password')
        .isLength({min:8, max: 25})
        .exists(),
    check('confirm_password', 'Confirm password doesnot match password')
        .isLength({min:8, max: 25})
        .exists()
        .custom((value, { req }) => {
            return value === req.body.password
        })
]




router.get('/',  (req, res, next)=>{
    res.status(200).render('register');
});

router.post('/', expressValidator, registerUser.registerUser);


module.exports = router;