const router = require('express').Router()
const Appointments = require('./appointmentsClass')

const RouteGuard = require('../../shared/validateAuthentication')

router.get('/',async (req, res, next)=>{
    let routeGuard = new RouteGuard(req.signedCookies, 0)
    if(await routeGuard.checkAuthentication() === true)
    {
        let email = req.signedCookies.email
        let appointments = new Appointments(email)
        let response =await appointments.init()

        res.send(response)
    }
    else{
        res.redirect('/login')
    }

})

module.exports = router