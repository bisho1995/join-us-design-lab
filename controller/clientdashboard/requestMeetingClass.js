const randomstring = require("randomstring")
const moment = require('moment')


const pm = require('../../model/users/peermotivators/peermotivator')
const pmAppointment = require('../../model/appointments/peermotivator/appointments')
const clientAppointment = require('../../model/appointments/client/appointments')
const winston = require('../../shared/logger')
const client = require('../../model/users/clients/client')


/**
 * ================== ALGO ======================
 * 
 * The client will give me a date, where he wants to set up a 
 * meeting. Along with the date he will also give me a start time 
 * and an end time. 
 * 
 * Now there are two cases
 * 1. If there is already a peer motivator associated witht the client
 * 2. There is no peer motivator associated with the client
 * 
 * For case 2
 * First i have to see which pms are available in that
 * date and that time range. After I have that data.
 * 
 * I shall iterate for each of the pms i got and  for each pm
 * i shall do the following. 
 * I shall check if the pm has any slot available for client
 * if no then I shall move to next pm in list.
 * If there is a slot available I shall add a slot.
 * At the same time I shall also update the client db with the date and time 
 * and name of the pm.
 * 
 * 
 * For case 1 
 * I have to check the appointments list of the pm for that date
 * Then I have to check if the pm is available in the time slot
 * if available then I shall add a meeting slot
 * If not available then I shall say not available.
 * 
 * 
 */



module.exports = class RequestMeeting{
    constructor(){
        this.start_time = 0
        this.end_time = 0
        this.date = new Date()
    }

    /**
     * Formats the end date according to the formatting rules mentioned 
     * in the docs of the project
     */
    formatEndDateRelativeToStartDate(){
        if(this.end_time < this.start_time){
            this.end_time = parseInt(this.end_time) + 24
        }
    }

    /**
     * Returns the unique ID of the client
     * @param {String} email The email id of the client whose _id is to be found
     */
    async getClientIdFromEmail(email){
        try {
            let id = await client.getIdFromEmail(email)
            return id
        } catch (error) {
            winston.error(error.stack)
        }
    }

    /**
     * 
     * returns the list of peer motivators available
     * on a particular date at a particular
     * time frame
     * 
     * @param {Number} start The preffered start time of the meeting
     * @param {Number} end The prefered end time of the meeting
     */
    getPmAvailableWithingRange(start, end){
        if(arguments.length != 2){
            throw new Error('Function expects two arguments')
        }
        else if(end < start){
            throw new Error('End time has to be greater than or equal to start time')
        }
        else if(end < 0 || start < 0){
            throw new Error('End time and start time has to be more than 0')
        }
        else if(end > 48 || start > 48){
            throw new Error('End time and start time has to be less than 48')
        }
        else{
            return new Promise((resolve, reject)=>{
                pm.getPmWithinRange(start, end)
                .then(docs=>{
                    docs = docs.map(doc=>{
                        return {
                            id: doc._id,
                            name: doc.name
                        }
                    })
                    resolve(docs)
                })
                .catch(err=>{
                    winston.error(err.stack)
                    reject(err)
                })
            })
        }
    }

    /**
     * This method initializes the default
     * class variables
     * @param {object} data The information of the meeting details, start time or end time like this
     * @param {string} emailOfClient the email id of the client
     */
    async OnInit(data, emailOfClient){
        this.start_time = parseInt(data.start_time)
        this.end_time = parseInt(data.end_time)
        this.date = data.date
        this.emailOfClient = emailOfClient


        this.formatEndDateRelativeToStartDate()
        let response = await this.startSlotFindingAndAllocationProcess(this.start_time, this.end_time, this.date)
        return response
        
    }//end of OnInit


    async startSlotFindingAndAllocationProcess(start_time, end_time, date){
        try{
            let meetingDetails = {
                name: '',
                date: '',
                start: '',
                end: ''
            }
            let pmAvailable = false
            let pmsAvailableWithinTimeRange = await this.getPmAvailableWithingRange(start_time, end_time)
            if(pmsAvailableWithinTimeRange.length === 0){
                return 'No one is available within range'
            }
            else{

                for(let i = 0 ; i < pmsAvailableWithinTimeRange.length ; i++){
                    let pm = pmsAvailableWithinTimeRange[i]
                    let available = await this.getPeermotivatorAvailabilityWithinRange(
                        date, 
                        pm.id, 
                        start_time, 
                        end_time
                    )
                    if(available !== false){
                        pmAvailable = true
                        try {
                            let startOfMeeting = available
                            let endOfMeeting = available + 0.5
                            let clientId = await this.getClientIdFromEmail(this.emailOfClient)

                            let meetingId = randomstring.generate(10)

                            let status = await this.addAppointmentForPeermotivator
                            (
                                date, 
                                clientId, 
                                pm.id, 
                                pm.name, 
                                startOfMeeting, 
                                endOfMeeting,
                                meetingId
                            )
                            this.addAppointmentForClient(
                                clientId,
                                date,
                                startOfMeeting,
                                endOfMeeting,
                                pm.name,
                                meetingId
                            )
                            meetingDetails.name = pm.name
                            meetingDetails.start = startOfMeeting
                            meetingDetails.end = endOfMeeting
                            meetingDetails.date = date
                            break   
                        } catch (error) {
                            winston.error(error.stack)
                            return 'There was an error!'
                        }
                    }
                }//end of loop of available pms
                if(pmAvailable === false){
                    return 'Unfortunately no pm is available within this time slot of this date'
                }
                else{
                    let response = 'Successfully set up appointment with pm ' + 
                        meetingDetails.name + ' ' +
                        meetingDetails.date + ' ' +
                        meetingDetails.start + ' ' +
                        meetingDetails.end
                    return response
                }
            }
        }catch(err){
            winston.error(err.stack)
            return 'There was an error!!'
        }
    }//end of startSlotFindingAndAllocationProcess


    /**
     * change the date formats while entering in the 
     * database in the respective functions then
     * i need not change the rest of 
     * the program here
     */



    /**
     * Adds appointment for client
     * @param {String} id 
     * @param {Date} date 
     * @param {Number} start_time 
     * @param {Number} end_time 
     * @param {String} name 
     */
    async addAppointmentForClient(id, date, start_time, end_time, name, meetingId){
        date = moment(date).format('YYYY/MM/DD')
        return new Promise(async (resolve, reject)=>{
            try {
                await clientAppointment.addAppointment(id, date, start_time, end_time, name, meetingId)   
                resolve(true)
            } catch (error) {
                winston.error(error.stack)
                reject(error)
            }
        })
    }

    addAppointmentForPeermotivator(date,clientId, id, name, start_time, end_time, meetingId){
        date = moment(date).format('YYYY/MM/DD')
        return new Promise((resolve, reject)=>{
            pmAppointment.addAppointment(date,clientId, id, name, start_time, end_time, meetingId)
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                winston.error(err.stack)
                reject(err)
            })
        })
    }

    getPeermotivatorAvailabilityWithinRange(date, id, start_time, end_time){
        return new Promise(async (resolve, reject)=>{
            try {
                let appointmentList = await pmAppointment.getAppointmentListForPmWithDate(date, id)   
                let _ar = appointmentList.map((a=>{return {'start': a.slot_timings.start, 'end': a.slot_timings.end}}))
                let isSlotAvailable = this.checkIfSlotIsAvailableForAppointmentList(_ar, start_time, end_time)
                
                resolve(isSlotAvailable)

            } catch (error) {
                winston.error(error.stack)
                reject(error)
            }

        })
    }//end of getPeermotivatorAvailabilityWithinRange


    /**
     * check if there are any slots available 
     * for a meeting with pm
     * reurns true if slot is available
     * @param {array} appointmentList The list of appointments for a peer motivator
     * @param {number} start_time The start of of the meeting
     * @param {number} end_time the end time of meeting
     */
    checkIfSlotIsAvailableForAppointmentList(appointmentList, start_time, end_time){
        let availableSlotsOfClient = this.generateAvailableSlotsFromTimeRange(start_time, end_time)
        let bookedSlotsOfPm = {}
        appointmentList.forEach(app=>{
            bookedSlotsOfPm[app.start] = true
        })
        for(let i = 0 ; i < availableSlotsOfClient.length ; i++){
            let slot = availableSlotsOfClient[i]
            if(slot in bookedSlotsOfPm === false){
                return slot
            }
        }
        return false
    }

    generateAvailableSlotsFromTimeRange(start, end){
        let ar = new Array()
        for(let i = start; i < end; i += 0.5)
            ar.push(i)
        return ar
    }

}