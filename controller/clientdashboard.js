let router = require('express').Router()

const RouteGuard = require('../shared/validateAuthentication')

let findcounselor = require('./clientdashboard/findcounselor')
let requestMeeting = require('./clientdashboard/requestmeeting')
let appointments =  require('./clientdashboard/appointments')
let logout = require('./clientdashboard/logout')

router.use('/find-counselor', findcounselor)
router.use('/request-meeting', requestMeeting)
router.use('/appointments', appointments)
router.use('/logout', logout)

router.get('/', async (req, res, next)=>{
    let routeGuard = new RouteGuard(req.signedCookies, 0)
    if(await routeGuard.checkAuthentication() === true)
        res.render('clientdashboard/index')
    else 
        res.redirect('/login')
})

module.exports = router