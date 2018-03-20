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
                winston.info(err);
                res.send('error');
            });
        }
        else{
            res.send('Email already exists');
        }
    })
    .catch(err=>{
        winston.error('There is some error in the register user.js '+err);
        res.send(err);
    });
}//end of registeruser


function getRequestData(object){
    return {
        name: object.full_name,
        email: object.email,
        password: object.password
    }
}//end of getrequestdata