'use strict'
const router = require('express').Router()
var request = require('request')
const winston = require('../../shared/logger')

const FindCounselor = require('./findCounselorClass')
const findCounselor = new FindCounselor()

const RouteGuaud = require('../../shared/validateAuthentication')

router.get('/',async (req, res, next)=>{
	/**
     * issue #3, #15 adding route guard
     * role based content access initiated 
     */
	let routeGuard = new RouteGuaud(req.signedCookies, 0)
	if(await routeGuard.checkAuthentication() === true)
		res.render('clientdashboard/find_counselor');
	else	
		res.redirect('../login')
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