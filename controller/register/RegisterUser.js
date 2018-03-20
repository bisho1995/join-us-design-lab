var client = require('../../model/users/clients/client');

var winston = require('../../shared/logger');


module.exports.registerUser = function(req, res, next){
    let userData = {
        name: req.body.full_name,
        email: req.body.email,
        password: req.body.password
    };
    client.registerClient(userData).then(data=>{
        winston.info(data);
        res.send('successfully registered');
    }).catch(err=>{
        winston.info(err);
        res.send('error');
    });
}//