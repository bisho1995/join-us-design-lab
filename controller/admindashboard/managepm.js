const router = require('express').Router();


router.get('/', (req, res, next)=>{
	res.send('manage pm working');
});


module.exports = router;