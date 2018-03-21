var client = require('../../model/users/clients/client');
var winston = require('../../shared/logger');

module.exports.loginUser = (req, res, next)=>{
    let data = {
        email: req.body.email,
        password: req.body.password
    }
    client.doesEmailExist(data.email).then(data=>{
        if(data == true){
            res.send('The account does exist, congrats');
        }
        else{
            res.send('The account does not exist, please register.');
        }
    })
    .catch(err=>{
        winston.error(err);
        res.send('Internal server error');
    })
    ;
}