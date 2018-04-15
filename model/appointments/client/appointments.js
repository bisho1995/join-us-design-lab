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
module.exports.addAppointment = (id, date, start_time, end_time, peermotivator)=>{
    return new Promise((resolve, reject)=>{
        let clientAppointment = new appointment({
            id: id,
            date: date,
            start_time: start_time,
            end_time: end_time,
            peermotivator: peermotivator
        })
        clientAppointment.save((err, doc)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(doc)
            }
        })
    })
}