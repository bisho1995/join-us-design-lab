var router = require('express').Router();
var winston = require('../shared/logger');

const LoginClient = require('./login/loginClient');
const client = new LoginClient()

const LoginPM = require('./login/loginPeerMotivator')
const pm = new LoginPM()

/**
 * ======================= ALGO ====================
 * The first step is to check if the user is already logged in
 * I can check this from cookie. If there is a cookie with
 * userid of the user and a token. 
 * I shall validate the email and the token. If they are valid then I 
 * shall say, yes the user is already logged in so I shall redirect him to the 
 * respective dashboard.
 * 
 * If the user is not validated then after loggin in i shall set a 
 * email cookie and a token cookie for the user
 * 
 * 
 * To check if the user is validated I shall  check from the database if the token
 * is a valid token for the particular client.
 */


router.get('/',async (req, res, next)=>{
    try {
        let status = await checkIfUserAlreadyLoggedIn(req.signedCookies, res)
        if(status === false)
            res.render('login');   
    } catch (error) {
        winston.error(error.stack)
    }
});

async function checkIfUserAlreadyLoggedIn(obj, res){
    let email = obj.email
    let token = obj.token


    if(email === undefined || token === undefined)
        return false
    else{
        let emailExists = await checkIfEmailExistsInSystem(email, [ client, pm ])
        if(emailExists === false){
            return false
        }
        else{
            let _isTokenValid = false
            switch(emailExists){
                case 0:
                    _isTokenValid = await validateAuthToken(email, token, client)
                    break
                case 1:
                _isTokenValid = await validateAuthToken(email, token, pm)
                    break
            }
            if(_isTokenValid === true){
                switch(emailExists){
                    case 0: 
                        redirectToClientDashboard(res)
                        break
                    case 1:
                        redirectToPeerMotivatorDashboard(res)
                        break
                }
            }
            else{
                return false
            }
        }
        return true
    }
}

function redirectToPeerMotivatorDashboard(res){
    res.redirect('./peermotivator-dashboard')
}

function redirectToClientDashboard(res){
    console.log('redirecting to client dashb')
    res.redirect('./client-dashboard')
}

async function validateAuthToken(email, token, user){
    try {
        let _tokenStatus = await user.validateAuthToken(email, token)
        console.log('Token status = ', _tokenStatus)
        return _tokenStatus   
    } catch (error) {
        winston.error(error.stack)
        return false
    }
}

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
                switch(emailExists){
                    case 0:
                        setAuthCookie(res, data.email, 'auth2')
                        setAuthToken(data.email, 'auth2', client)
                        redirectToClientDashboard(res)
                        break
                    case 1:
                        setAuthCookie(res, data.email, 'auth3')
                        setAuthToken(data.email, 'auth3', pm)
                        redirectToPeerMotivatorDashboard(res)
                        break
                }
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

function setAuthCookie(res, email, token){
    res.cookie('email', email, { maxAge: new Date(Date.now() + 900000),  signed: true })
    res.cookie('token', token, { maxAge: new Date(Date.now() + 900000),  signed: true })
}


function setAuthToken(email, token, user){
    user.setAuthToken(email, token)
}


/**
 * returns false if the email does not exist in the system
 * returns 0 if it belongs to a client
 * returns 1 if it belongs to a peer motivator
 * 
 * 
 * @param {string} email  the email id of the client
 * @param {array} ar the array of objects of availble users, here till now client and pm
 */
async function checkIfEmailExistsInSystem(email, ar){
        try{
            for(let i = 0; i < ar.length ; i++){
                let status = await ar[i].checkIfEmailExists(email)
                if(status === true)
                    return i
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