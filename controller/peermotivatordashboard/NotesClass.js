/**
 * =================== ALGO ======================
 * This class should have the email id of the peer motivator
 * [the unique id of the peer motivator can be found from the
 * email id of the peer motivator]
 * 
 * It should also have the client id and the post parameters
 * 
 * Now there may be two situations
 * 1. GET
 * 2. POST
 * 
 * 1. GET
 * In case of get request the notes page should be displayed with the 
 * earlier notes of the client.
 * So I have to get all the previous notes of the client and display
 * it to the peer motivator.
 * 
 * 2. POST
 * If there is a post message then there must be a new note entry for the client.
 * In this case get the note entry
 * then save it in the database. 
 * After this get all the notes from the database  and 
 * display it to the user.
 * 
 */

const client = require('../../model/users/clients/client')
const winston = require('../../shared/logger')

module.exports = class Notes {
    constructor(pmEmail, clientId, body){
        this.pmEmail = pmEmail
        this.clientId = clientId
        this.note = body.note
    }


    async postMessageSequenceEvents(){
        try {
            await this.addNote(this.clientId, this.note)
            let notes = await this.getAllNotesOfClient(this.clientId)
            return notes   
        } catch (error) {
            winston.error(error)
            return []
        }
    }

    async getMessageSequenceEvents(){
        try {
            let notes = await this.getAllNotesOfClient(this.clientId)
            return notes   
        } catch (error) {
            winston.error(error)
            return []
        }
    }

    async getAllNotesOfClient(id){
        try {
            let notes = await client.getAllNotes(id)
            return notes.reverse()
        } catch (error) {
            winston.error(error.stack)
            return []
        }
    }

    async addNote(id, note){
        try {
            let response = await client.addNote(id, note)
        } catch (error) {
            winston.error(error.stack)
        }
    }
}