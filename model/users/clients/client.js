var connection = require('../../db');
var model = require('./clientSchema');

var winston = require('../../../shared/logger');


module.exports.registerClient = function(data){
    return new Promise((resolve, reject)=>{
        let client = new model({
            name: data.name,
            email: data.email,
            password: data.password
        });
        client.save((err, client)=>{
            if(err){
                winston.info('error in registering user in registeruser.js ' + err );
                reject(err);
            }
            else{
                resolve(client);
            }
        });
    });
};


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


module.exports.doesEmailExist = function(email){
    return new Promise((resolve, reject)=>{
        model.findOne({'email': email}, (err, client)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(client !== null)
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


module.exports.getIdFromEmail = (email)=>{
    return new Promise((resolve, reject)=>{
        model.findOne({ email: email }, (err, docs)=>{
            if(err){
                reject(err)
            }
            else{
                if(docs === null || docs === undefined)
                    resolve(undefined)
                else{
                    resolve(docs._id)
                }
            }
        })
    })
}


