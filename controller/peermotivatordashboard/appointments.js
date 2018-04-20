const router = require('express').Router()
const Appointments = require('./AppointmentsClass')

router.get('/',async (req, res, next)=>{
    let appointments = new Appointments(req.signedCookies.email)
    let response = await appointments.init()
    res.send(response)

    //res.render("pmdashboard/appointments")
})

module.exports = router