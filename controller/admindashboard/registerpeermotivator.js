'use strict'
var router = require('express').Router()
const pm = require('../../model/users/peermotivators/peermotivator')
const winston = require('../../shared/logger')

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
		}),
	check('start_time', 'The start time and the end time has to be within 0 and 24')
		.exists().
		custom(value=>{
			return value >= 0 && value <= 24
		}),
	check('end_time', 'The end time and the end time has to be within 0 and 24')
		.exists()
		.custom(value=>{
			return value >= 0 && value <= 24
		})
]



router.get('/', (req, res, next)=>{
	res.render('admindashboard/registerpm')
});

router.post('/', expressValidator, (req, res, next)=>{

	const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).send(errors.mapped())
	}
	else{
		let data = makeDataFromRequestBody(req.body)


		pm.doesEmailExist(data.email)
		.then(emailPresent=>{
			if(emailPresent === true){
				res.send('The email is already taken.')
			}
			else{
				registerNewPm(data)
					.then(data=>res.send(data))
			}
		})
		.catch(err=>
			{
				winston.error(err.stack)
				res.send('There was an error in checking if the email already exists.')
			})	
	}
});


function formatData(data){
	if(data.start_time < data.end_time)
		data.end_time = 24 + parseInt(data.end_time)
	return data
}

function makeDataFromRequestBody(userData){
	let _tmp = {
		name: userData.name,
		email: userData.email,
		password: userData.password,
		start_time: parseInt(userData.start_time),
		end_time: parseInt(userData.end_time)
	}

	if( _tmp.end_time < _tmp.start_time ){
		_tmp.end_time = parseInt(_tmp.end_time) + 24
	}
	return _tmp
}

/**
 * 
 * @param {object} data This is the data object which is to be inserted to the db
 */
function registerNewPm(data){
	return new Promise(resolve=>{
		pm.registerPm(data)
		.then(resp=>
			{
				console.log(resp)
				resolve('Successfully registered a pm')
			}).catch(err=>{
				winston.error(err.stack)
				resolve('There was an error in registering the pm')
			});
	});
}


module.exports = router;