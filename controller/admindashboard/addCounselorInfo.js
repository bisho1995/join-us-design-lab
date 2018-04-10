const router = require('express').Router()

router.get('/', (req, res, next)=>{
    res.render('admindashboard/addCounselorInfo')
})


module.exports = router