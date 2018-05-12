const router = require('express').Router()
const RequestMeeting = require('./requestMeetingClass')
const requestMeeting = new RequestMeeting()
const RouteGuard = require('../../shared/validateAuthentication')

router.get('/',async (req, res, next)=>{
    /**
     * issue #3, #15 adding route guard
     * role based content access initiated 
     */
    let routeGuard = new RouteGuard(req.signedCookies, 0)
    if(await routeGuard.checkAuthentication() === false){
        res.redirect('../login')
    }
    else
    {
        res.render('clientdashboard/requestMeeting')
    }
})

router.post('/',async (req, res, next)=>{
    /**
     * issue #3 adding route guard
     * role based content access initiated 
     */
    let routeGuard = new RouteGuard(req.signedCookies, 0)
    if(await routeGuard.checkAuthentication === false){
        res.redirect('../login')
    }
    else{
        let response = await requestMeeting.OnInit(req.body, req.signedCookies.email)
        console.log('respose ', response)
        res.send(response)
    }
})

module.exports = router