let router = require('express').Router()

let findcounselor = require('./clientdashboard/findcounselor')


router.use('/find-counselor', findcounselor)

router.get('/', (req, res, next)=>{
    res.send('client dashboard works');
})

module.exports = router