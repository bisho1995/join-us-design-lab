const router = require('express').Router()
const Appointments = require('./appointmentsClass')



router.get('/',async  (req, res, next)=>{
    let email = req.signedCookies.email
    let appointments = new Appointments(email)
    let response =await appointments.init()

    res.send(response)

    //res.render('clientdashboard/appointments')
})

module.exports = router