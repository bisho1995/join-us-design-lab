const router = require('express').Router();

var managepm = require('./admindashboard/managepm');
var managecounselor = require('./admindashboard/managecounselor');

router.use('/manage-peer-motivator', managepm);
router.use('/manage-counselor-information', managecounselor);

router.get('/', (req, res, next)=>{
	res.render('admindashboard/dashboard');
});

module.exports = router;