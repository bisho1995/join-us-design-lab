let appointments = require('./schema')
const winston = require('../../../shared/logger')


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



module.exports.addAppointment = (date, pm_id, name, start, end)=>{
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
