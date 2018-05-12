const router = require('express').Router()
const Notes = require('./NotesClass')
const RouteGuaud = require('../../shared/validateAuthentication')

router.get('/', async (req, res, next)=>{
    /**
     * issue #3, #15 adding route guard
     * role based content access initiated 
     */
    let routeGuard = new RouteGuaud(req.signedCookies, 1)
    if(await routeGuard.checkAuthentication() === true){
        let notes = new Notes(req.signedCookies.email, req.query.client, req.body)
        let prevNotes = await notes.getMessageSequenceEvents()

        res.render('pmdashboard/notes', {
            notes: prevNotes
        })
    }
    else{
        res.redirect('/login')
    }
})

router.post('/', async (req, res, next)=>{
    /**
     * issue #3 adding route guard
     * role based content access initiated 
     */
    let routeGuard = new RouteGuaud(req.signedCookies, 1)
    if(await routeGuard.checkAuthentication() === true){
        let notes = new Notes(req.signedCookies.email, req.query.client, req.body)
        let prevNotes = await notes.postMessageSequenceEvents()

        res.render('pmdashboard/notes',{
            notes: prevNotes
        })
    }
    else{
        res.redirect('/login')
    }
})

module.exports = router