var router = require('express').Router();

router.get('/', (req, res, next)=>{
	res.render('admindashboard/registerpm');
});

router.post('/', (req, res, next)=>{
	let userData = req.body;
	res.send('working bro...');
});


module.exports = router;