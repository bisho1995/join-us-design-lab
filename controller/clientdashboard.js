let router = require('express').Router()

let findcounselor = require('./clientdashboard/findcounselor')
let requestMeeting = require('./clientdashboard/requestmeeting')

router.use('/find-counselor', findcounselor)
router.use('/request-meeting', requestMeeting)

router.get('/', (req, res, next)=>{
    res.render('clientdashboard/index')
})

module.exports = router