const router = require('express').Router()
const Appointments = require('./AppointmentsClass')

const RouteGuaud = require('../../shared/validateAuthentication')

router.get('/',async (req, res, next)=>{
    let routeGuard = new RouteGuaud(req.signedCookies, 1)
    if(await routeGuard.checkAuthentication() === true){
        let appointments = new Appointments(req.signedCookies.email)
        let response = await appointments.init()

        res.render("pmdashboard/appointments", {
            response: response
        })
    }
    else{
        res.render('/login')
    }
})

module.exports = router