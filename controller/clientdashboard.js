let router = require('express').Router()

let findcounselor = require('./clientdashboard/findcounselor')
let requestMeeting = require('./clientdashboard/requestmeeting')
let appointments =  require('./clientdashboard/appointments')
let logout = require('./clientdashboard/logout')

router.use('/find-counselor', findcounselor)
router.use('/request-meeting', requestMeeting)
router.use('/appointments', appointments)
router.use('/logout', logout)

router.get('/', (req, res, next)=>{
    res.render('clientdashboard/index')
})

module.exports = router