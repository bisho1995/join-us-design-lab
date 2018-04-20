var model = require('./schema');


var winston = require('../../../shared/logger');


module.exports.getIdFromEmail = (email)=>{
    return new Promise((resolve, reject)=>{
        model.findOne({email: email}, (err, doc)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(doc._id)
            }
        })
    })
}

module.exports.registerPm = function(data){
    return new Promise((resolve, reject)=>{
        let client = new model({
            name: data.name,
            email: data.email,
            password: data.password,
            start_time: data.start_time,
            end_time: data.end_time
        });
        client.save((err, client)=>{
            if(err){
                winston.info('error in registering peermotivator in peermotivator.js ' + err );
                reject(err);
            }
            else{
                resolve(client);
            }
        });
    });
};




module.exports.doesEmailExist = function(email){
    return new Promise((resolve, reject)=>{
        model.findOne({'email': email}, (err, client)=>{
            if(err){
                reject(err);
            }
            else{
                if(client === null || client === undefined || client === 'null' || client === 'undefined')
                    resolve(false)
                else{
                    if(Object.keys(client).length === 0){
                        resolve(false);
                    }
                    else{
                        resolve(true);
                    }
                }
            }
        })
    });
}


module.exports.setAuthToken = (email, token)=>{
    return new Promise((resolve, reject)=>{
        model.findOne({'email': email}, (err, client)=>{
            if(err){
                reject(err)
            }
            else{
                let _tmp =[ token ]
                client.authKeys = _tmp
                client.save((err, doc)=>{
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(doc)
                    }
                })
            }
        })
    })
}

module.exports.getAuthToken = (email)=>{
    return new Promise((resolve, reject)=>{
        model.findOne({'email': email}, (err, client)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(client.authKeys)
            }
        })
    })
}




module.exports.getAllPm = ()=>{
    return new Promise((resolve, reject)=>{
        model.find((err, docs)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(docs);
            }
        })
    });
}


module.exports.getPasswordForEmail = (email)=>{
    return new Promise((resolve, reject)=>{
        model.findOne({email: email}, ['password'], (err, docs)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(docs)
            }
        })
    })
}


module.exports.getPmWithinRange = (start, end)=>{
    return new Promise((resolve, reject)=>{
        /**
         * 
            start_time: { $lte: start },
            end_time: { $gte: end }
         */
        model.find({
            $or: [
                {
                    start_time: { $lte: start},
                    end_time: { $gte: start + 1}
                },
                {
                    end_time: {$gte: end},
                    start_time: { $lte: end - 1 }
                }
            ]
        }, (err, docs)=>{
            if(err)
                reject(err)
            else{
                resolve(docs)
            }
        })
    })
}