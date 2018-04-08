let router = require('express').Router()

let findcounselor = require('./clientdashboard/findcounselor')


router.use('/find-counselor', findcounselor)

router.get('/', (req, res, next)=>{
    res.render('clientdashboard/index')
})

module.exports = router