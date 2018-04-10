'use strict'
const router = require('express').Router();

var managepm = require('./admindashboard/managepm');
var managecounselor = require('./admindashboard/managecounselor');
var registerpm = require('./admindashboard/registerpeermotivator');
const addCounselorInfo = require('./admindashboard/addCounselorInfo')

router.use('/manage-peer-motivator', managepm)
router.use('/manage-counselor-information', managecounselor)
router.use('/register-peer-motivator', registerpm)
router.use('/add-counselor-info', addCounselorInfo)

router.get('/', (req, res, next)=>{
	res.render('admindashboard/dashboard');
});

module.exports = router;