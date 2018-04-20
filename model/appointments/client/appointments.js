const appointment = require('./schema')
const winston = require('../../../shared/logger')

/**
 * sets up an appointment with a
 * peer motivator
 * @param {String} id The id of the client
 * @param {Date} date The date of the meeting
 * @param {Number} start_time The start time of the meeting
 * @param {Number} end_time The end time of the meeting
 * @param {String} peermotivator The name of the peer motivator
 */
module.exports.addAppointment = (id, date, start_time, end_time, peermotivator, meetingId)=>{
    return new Promise((resolve, reject)=>{
        appointment.findOne({id: id}, (err, docs)=>{
            if(err){
                reject(err)
            }
            else{
                if(docs === null || docs === undefined){
                    let clientAppointment = new appointment({
                        id: id,
                        date: date,
                        start_time: start_time,
                        end_time: end_time,
                        peermotivator: peermotivator,
                        meetingId: meetingId
                    })
                    clientAppointment.save((err, doc)=>{
                        if(err){
                            reject(err)
                        }
                        else{
                            resolve(doc)
                        }
                    })
                }
                else{
                    docs.date = date
                    docs.start_time = start_time
                    docs.end_time = end_time
                    docs.peermotivator = peermotivator
                    docs.meetingId = meetingId
                    docs.save()
                }
            }
        })
    })
}



module.exports.getAppointmentDetailsForClientId = (id)=>{
    return new Promise((resolve, reject)=>{
        appointment.findOne({id: id}, (err, docs)=>{
            if(err){
                reject(err)
            }
            else{
                resolve({
                    date: docs.date,
                    start_time: docs.start_time,
                    end_time: docs.end_time,
                    meetingId: docs.meetingId
                })
            }
        })        
    })
}