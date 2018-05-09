const client = require('../../model/users/clients/client');
const winston = require('../../shared/logger');

const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');



module.exports.registerUser = function(req, res, next){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).send(errors.mapped())
    }
    else{
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
    }
}//end of registeruser


function getRequestData(object){
    return {
        name: object.full_name,
        email: object.email,
        password: object.password
    }
}//end of getrequestdata