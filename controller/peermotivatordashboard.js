const router = require('express').Router()

router.get('/', (req, res, next)=>{
    res.render('pmdashboard/index')
})

module.exports =  router
