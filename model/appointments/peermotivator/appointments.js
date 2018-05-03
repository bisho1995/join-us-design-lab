let appointments = require('./schema')
const winston = require('../../../shared/logger')


/**
 * Get an array of the list of appointments
 * of a peermotivator
 * @param {String} date The date of the appointments
 * @param {String} id The id of the client
 */
module.exports.getAppointmentListForPmWithDate = (date, id)=>{
    return new Promise((resolve, reject)=>{
        appointments.findOne({ date: date }, (err, doc)=>{
            if(err){
                reject(err)
            }
            else{
                if(doc === null || doc === undefined || doc === 'null' || doc === 'undefined' || doc.length === 0){
                    resolve([])
                }
                else{
                    resolve(doc.peermotivators.filter(pm=>pm.id == id))
                }
            }
        })
    })
}


/**
 * Adds an appointment between pm and client
 * 
 * @param {String} date The date of the appointment
 * @param {String} clientId The id of the client with whome the meeting is set
 * @param {String} pm_id The id of the peer motivator
 * @param {String} name The name of the peer motivator
 * @param {Number} start The start hour (0 to 48) check docs
 * @param {Number} end The end hour of the meeting
 */
module.exports.addAppointment = (date,clientId, pm_id, name, start, end, meetingId)=>{
    return new Promise((resolve, reject)=>{
        appointments.findOne({ date: date }, (err, doc)=>{
            if(err){
                reject(err)
            }
            else{
                if(doc === null || doc === undefined || doc === 'null' || doc === 'undefined' || doc.length === 0){
                    let appointment =  new appointments({
                        date: date,
                        peermotivators: [
                            {
                                meetingId: meetingId,
                                client_id: clientId,
                                id: pm_id,
                                name: name,
                                slot_timings: {
                                    start: start,
                                    end: end
                                }
                            }
                        ]
                    })
                    appointment.save((err, doc)=>{
                        if(err){
                            reject(err)
                        }
                        else{
                            resolve(doc)
                        }
                    })
                }//end of no doc exists for date
                else{
                    let obj = {
                        meetingId: meetingId,
                        client_id: clientId,
                        id: pm_id,
                        name: name,
                        slot_timings: {
                            start: start,
                            end: end
                        }
                    }
                    let _pms= doc.peermotivators.concat([obj])
                    doc.peermotivators = _pms
                    doc.save((err, doc)=>{
                        if(err){
                            reject(err)
                        }
                        else{
                            resolve(doc)
                        }
                    })
                }
            }
        })
    })
}
