var client = require('../../model/users/clients/client');


module.exports.registerUser = function(req, res, next){
    let userData = {
        name: req.body.full_name,
        email: req.body.email,
        password: req.body.password
    };
    client.registerClient(userData).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send('error');
    });
}