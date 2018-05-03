const router = require('express').Router()

const Notes = require('./NotesClass')

router.get('/', async (req, res, next)=>{
    let notes = new Notes(req.signedCookies.email, req.query.client, req.body)
    let prevNotes = await notes.getMessageSequenceEvents()

    res.render('pmdashboard/notes', {
        notes: prevNotes
    })
})

router.post('/', async (req, res, next)=>{
    let notes = new Notes(req.signedCookies.email, req.query.client, req.body)
    let prevNotes = await notes.postMessageSequenceEvents()

    res.render('pmdashboard/notes',{
        notes: prevNotes
    })
})

module.exports = router