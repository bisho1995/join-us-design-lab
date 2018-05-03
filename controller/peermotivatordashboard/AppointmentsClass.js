const pm = require('../../model/users/peermotivators/peermotivator')
const pmAppointment = require("../../model/appointments/peermotivator/appointments")
const moment = require('moment')
const winston = require('../../shared/logger')


class Appointments {

    constructor(email){
        this.email = email
        this.pmId = null
    }
    
    /**
     * the theoritical starting point of the 
     * application
     */
    async init(){
        try {
            let id = this.pmId = await this.getPmIdFromEmail()
            let response = await this.checkAppointment()
            return response
        } catch (error) {
            winston.error(error.stack)
            return {
                error: true,
                isAppointment: false,
                appointments: []
            }
        }
    }


    
    /**
     * Get the unique pm id 
     * from the email address of the client
     */
    async getPmIdFromEmail(){
        return new Promise(async (resolve, reject)=>{
            try {
             let id = await pm.getIdFromEmail(this.email)  
             resolve(id)
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Gets the appointment details of the client
     * the details include the date
     * the start time
     * and the end time
     * 
     */
    async getAppointmentDetails(){
        try {
            let docs = await pmAppointment.getAppointmentListForPmWithDate(moment(new Date()).format('YYYY/MM/DD'), this.pmId)
            docs = docs.filter(doc=>{
                return doc.slot_timings.start > new Date().getHours()
            }).map(doc=>{
                return {
                    start: doc.slot_timings.start,
                    meetingId: doc.meetingId,
                    client_id: doc.client_id 
                }
            })
            //console.log(docs)
            return docs
        } catch (error) {
            winston.error(error.stack)
        }
    }


    
    /**
     * returns the current date in YYYYMMDD dormat
     */
    getCurrentDate(){
        return moment(new Date()).format('YYYY/MM/DD')
    }

    /**
     * check if two dates are same
     * @param {String} date1 first date
     * @param {String} date2 second date
     */
    checkIfDatesAreSame(date1, date2){
        return date1.localeCompare(date2) === 0
    }


    /**
     * get current hour of
     * day
     */
    getCurrentHour(){
        return new Date().getHours()
    }


    async checkAppointment(){
        try {
            let appointmentDetails  =await this.getAppointmentDetails()
            

            if(appointmentDetails.length === 0){
                return {
                    isAppointment: false,
                    appointments: [],
                    error: false
                }
            }
            else{
                let appointments = []
                let str = ""
                appointmentDetails.forEach(app=>{
                    let obj = {
                        link: process.env.chatSite + app.meetingId,
                        start: app.start,
                        client_id: app.client_id
                    }
                    appointments.push(obj)
                })
                return {
                    error: false,
                    isAppointment: true,
                    appointments: appointments
                }
            }

        } catch (error) {
            winston.error(error.stack)
            return {
                isAppointment: false,
                appointments: [],
                error: true
            }
        }
    }//end of checkAppointment

}

module.exports = Appointments