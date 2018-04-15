const pm = require('../../model/users/peermotivators/peermotivator')
const appointment = require('../../model/appointments/peermotivator/appointments')
const winston = require('../../shared/logger')

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

    formatEndDateRelativeToStartDate(){
        if(this.end_time < this.start_time){
            this.end_time = parseInt(this.end_time) + 24
        }
    }

    getPmAvailableWithingRange(start, end){
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

    async OnInit(data){
        this.start_time = parseInt(data.start_time)
        this.end_time = parseInt(data.end_time)
        this.date = data.date


        this.formatEndDateRelativeToStartDate()
        this.startSlotFindingAndAllocationProcess(this.start_time, this.end_time, this.date)
        
    }//end of OnInit


    async startSlotFindingAndAllocationProcess(start_time, end_time, date){
        try{
            let pmAvailable = false
            let pmsAvailableWithinTimeRange = await this.getPmAvailableWithingRange(start_time, end_time)
            if(pmsAvailableWithinTimeRange.length === 0){
                console.log('No one is available within range')
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
                            let status = await this.addAppointmentForPeermotivator(date, pm.id, pm.name, available, available + 0.5)
                            break   
                        } catch (error) {
                            winston.error(error.stack)
                        }
                    }
                }//end of loop of available pms
                if(pmAvailable === false){
                    console.log('Unfortunately no pm is available within this time slot of this date')
                }
                else{
                    console.log('Successfully set up appointment with pm')
                }
            }
        }catch(err){
            winston.error(err.stack)
        }
    }//end of startSlotFindingAndAllocationProcess

    addAppointmentForPeermotivator(date, id, name, start_time, end_time){
        return new Promise((resolve, reject)=>{
            appointment.addAppointment(date, id, name, start_time, end_time)
            .then(data=>{
                resolve(data)
            })
            .catch(err=>{
                console.log(err)
                winston.error(err.stack)
                reject(err)
            })
        })
    }

    getPeermotivatorAvailabilityWithinRange(date, id, start_time, end_time){
        return new Promise(async (resolve, reject)=>{
            try {
                let appointmentList = await appointment.getAppointmentListForPmWithDate(date, id)   
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