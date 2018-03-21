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


module.exports.doesEmailExist = function(email){
    return new Promise((resolve, reject)=>{
        model.findOne({'email': email}, (err, client)=>{
            if(err){
                reject(new Error(err));
            }
            else{
                if(isEmptyObject(client) === true){
                    resolve(false);
                }
                else{
                    resolve(true);
                }
            }
        })
    });
}




function isEmptyObject(objectInput) {
    for ( name in objectInput){
      return false;
    }
    return true;
}