const router = require('express').Router()

const appointments = require('./peermotivatordashboard/appointments')
const notes = require('./peermotivatordashboard/notes')

router.use('/appointments', appointments)
router.use('/notes', notes)

router.get('/', (req, res, next)=>{
    res.render('pmdashboard/index')
})

module.exports =  router
