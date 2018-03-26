const router = require('express').Router();


router.get('/', (req, res, next)=>{
	res.send('manage counselor working');
});

module.exports = router;