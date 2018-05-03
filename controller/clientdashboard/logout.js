'use strict'
const router = require('express').Router()

const RouteGuaud = require('../../shared/validateAuthentication')

router.get('/', async (req, res, next)=>{
    let routeGuard = new RouteGuaud(req.signedCookies, 0)
    if(await routeGuard.checkAuthentication() === true){
        res.clearCookie("token")
        res.clearCookie("email")

        res.redirect('/')
    }
    else{
        res.redirect('../login')
    }
})

module.exports = router