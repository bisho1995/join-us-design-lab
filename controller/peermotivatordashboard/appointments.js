const router = require('express').Router()
const Appointments = require('./AppointmentsClass')

router.get('/',async (req, res, next)=>{
    let appointments = new Appointments(req.signedCookies.email)
    let response = await appointments.init()

    
    //console.log(response)
    //res.send(response)

    res.render("pmdashboard/appointments", {
        response: response
    })
})

module.exports = router