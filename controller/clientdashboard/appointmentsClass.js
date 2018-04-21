const client = require('../../model/users/clients/client')
const winston = require('../../shared/logger')
const clientAppointment = require('../../model/appointments/client/appointments')
const moment = require('moment')


class Appointments {


    constructor(email){
        this.email = email
        this.clientId = null
    }


    /**
     * the theoritical starting point of the 
     * application
     */
    async init(){
        try {
            let id = this.clientId = await this.getClientIdFromEmail()
            let response = await this.checkAppointment()
            return response
        } catch (error) {
            winston.error(error.stack)
            return 'There was an error !!!'
        }
    }



    /**
     * Get the unique client id 
     * from the email address of the client
     */
    async getClientIdFromEmail(){
        return new Promise(async (resolve, reject)=>{
            try {
             let id = await client.getIdFromEmail(this.email)   
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
            let doc = await clientAppointment.getAppointmentDetailsForClientId(this.clientId)
            return doc
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
            if(appointmentDetails === null || appointmentDetails === undefined){
                return 'You do not have any appointments today.'
            }
            else{
                let appointmentDate = appointmentDetails.date
                let currentDate = this.getCurrentDate()


                if(this.checkIfDatesAreSame(appointmentDate, currentDate) === true){
                    if(this.getCurrentHour() < appointmentDetails.start_time){

                        let chatLink = process.env.chatSite + appointmentDetails.meetingId
                        return 'You have an appointment today at ' + 
                        appointmentDetails.start_time + 
                        "  <a href='" + chatLink + "' target ='_blank'>" + chatLink  


                    }//end of if there is time for meeting
                    else{
                        return 'You missed your appointment'
                    }
                }//end  of if dates are same
                else{
                    return 'Today No appointment'
                }
            }//end of there are appointments today
        } catch (error) {
            winston.error(error.stack)
            return 'There was an error, we are working on it!!'
        }
    }//end of checkAppointment

}

module.exports = Appointments