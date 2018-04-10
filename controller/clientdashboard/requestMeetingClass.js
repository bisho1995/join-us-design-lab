const pm = require('../../model/users/peermotivators/peermotivator')
const winston = require('../../shared/logger')


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
        this.start_time = data.start_time
        this.end_time = data.end_time
        this.date = data.date


        this.formatEndDateRelativeToStartDate()

        try{
            let pmsAvailableWithinTimeRange = await this.getPmAvailableWithingRange(this.start_time, this.end_time)
            if(pmsAvailableWithinTimeRange.length === 0){
                console.log('No one is available within range')
            }
            else{
                console.log(pmsAvailableWithinTimeRange)
            }
        }catch(err){
            winston.error(err.stack)
        }
    }
}