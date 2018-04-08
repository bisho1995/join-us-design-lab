'use strict'
const router = require('express').Router()
var request = require('request')
const winston = require('../../shared/logger')

const FindCounselor = require('./findCounselorClass')
const findCounselor = new FindCounselor()


router.get('/', (req, res, next)=>{
	res.render('clientdashboard/find_counselor');
});

router.post('/',async (req, res, next)=>{
	try{
		let data =await findCounselor.postReqWork(req.body.location, req.body.pagetoken, req.body.keyword)
		res.send(data)
	}catch(err){
		winston.error(err.stack)
	}

});


module.exports = router;