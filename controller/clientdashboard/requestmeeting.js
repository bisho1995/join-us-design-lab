const router = require('express').Router()
const RequestMeeting = require('./requestMeetingClass')
const requestMeeting = new RequestMeeting()

router.get('/', (req, res, next)=>{
    res.render('clientdashboard/requestmeeting')
})

router.post('/', (req, res, next)=>{
    requestMeeting.OnInit(req.body)
    res.send(req.body)
})

module.exports = router