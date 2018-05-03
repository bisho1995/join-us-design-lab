const router = require('express').Router()

const RouteGuard = require('../shared/validateAuthentication')

const appointments = require('./peermotivatordashboard/appointments')
const notes = require('./peermotivatordashboard/notes')
const logout = require('./peermotivatordashboard/logout')

router.use('/appointments', appointments)
router.use('/notes', notes)
router.use('/logout', logout)


router.get('/', async (req, res, next)=>{
    let routeGuard = new RouteGuard(req.signedCookies, 1)
    if(await routeGuard.checkAuthentication() === true)
        res.render('pmdashboard/index')
    else
        res.redirect('/login')
})

module.exports =  router
