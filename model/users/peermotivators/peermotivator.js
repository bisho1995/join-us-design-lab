var connection = require('../../db');
var model = require('./schema');


var winston = require('../../../shared/logger');


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
                if(Object.keys(client).length === 0){
                    resolve(false);
                }
                else{
                    resolve(true);
                }
            }
        })
    });
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
        model.find({
            start_time: { $lte: start },
            end_time: { $gte: end }
        }, (err, docs)=>{
            if(err)
                reject(err)
            else{
                resolve(docs)
            }
        })
    })
}