var client = require('../../model/users/clients/client');
var winston = require('../../shared/logger');


module.exports.registerUser = function(req, res, next){
    let userData = getRequestData(req.body);
    client.doesEmailExist(userData.email)
    .then((emailExist)=>{
        if(emailExist == false){
            client.registerClient(userData)
            .then(data=>{
                winston.info(data);
                res.send('successfully registered');
            })
            .catch(err=>{
                winston.error(err.stack);
                res.send('error');
            });
        }
        else{
            res.send('Email already exists');
        }
    })
    .catch(err=>{
        winston.error(err.stack);
        res.send(err);
    });
}//end of registeruser


module.exports.getRequestData = getRequestData

function getRequestData(object){
    return {
        name: object.full_name,
        email: object.email,
        password: object.password
    }
}//end of getrequestdata