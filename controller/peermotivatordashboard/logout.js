'use strict'
const router = require('express').Router()

router.get('/', (req, res, next)=>{
    console.log(req.signedCookies)
    res.clearCookie("token")
    res.clearCookie("email")

    res.redirect('/')
})

module.exports = router