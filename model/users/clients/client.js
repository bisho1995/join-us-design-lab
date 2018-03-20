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