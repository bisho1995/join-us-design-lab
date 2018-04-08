var router = require('express').Router();
var winston = require('../shared/logger');

const LoginClient = require('./login/loginClient');
const client = new LoginClient()

const LoginPM = require('./login/loginPeerMotivator')
const pm = new LoginPM()



router.get('/', (req, res, next)=>{
    res.render('login');
});


router.post('/', async (req, res, next)=>{
    let data = {
        email: req.body.email,
        password: req.body.password
    }

    try{
        let emailExists = await checkIfEmailExistsInSystem(data.email, [ client, pm ])

        if(emailExists === false){
            res.send('The email with which you are trying to login is not registered, do register it first.')
        }
        else{
            let areCredentialsValid = await validateCredentials(data, [client, pm])
            if(areCredentialsValid === true){
                res.redirect('./client-dashboard')
            }
            else{
                res.send('Either Username or password do not match')
            }
        }
    }
    catch(err){
        winston.error(err.stack)
        res.send('Internal Server Error')
    }
})


async function checkIfEmailExistsInSystem(email, ar){
        try{
            for(let i = 0; i < ar.length ; i++){
                let status = await ar[i].checkIfEmailExists(email)
                if(status === true)
                    return true
            }
            return false
        }
        catch(err){
            winston.error(err.stack)
            throw err
        }
}

async function validateCredentials(userObject, ar){
    try{
        for(let i = 0; i < ar.length ; i++){
            let status = await ar[i].validateCredentials(userObject)
            if(status === true)
                return true
        }
        return false
    }
    catch(err){
        winston.error(err.stack)
        throw err
    }
}

module.exports = router;