const router = require('express').Router()

const appointments = require('./peermotivatordashboard/appointments')
const notes = require('./peermotivatordashboard/notes')
const logout = require('./clientdashboard/logout')

router.use('/appointments', appointments)
router.use('/notes', notes)
router.use('/logout', logout)


router.get('/', (req, res, next)=>{
    res.render('pmdashboard/index')
})

module.exports =  router
