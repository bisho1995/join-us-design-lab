const router = require('express').Router()

const appointments = require('./peermotivatordashboard/appointments')

router.use('/appointments', appointments)

router.get('/', (req, res, next)=>{
    res.render('pmdashboard/index')
})

module.exports =  router
