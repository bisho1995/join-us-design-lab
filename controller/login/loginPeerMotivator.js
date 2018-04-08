var pm = require('../../model/users/peermotivators/peermotivator');
var winston = require('../../shared/logger');

module.exports = class LoginPM {
    constructor(){

    }

    /**
     * Checks if the email id supplied to the function is a 
     * registered email email id in the pm database
     * If it is valid it returns true
     * @param {string} email The email id of the pm
     */
    checkIfEmailExists(email){
        return new Promise((resolve, reject)=>{
            pm.doesEmailExist(email)
                .then(data=>{
                    resolve(data)
                })
                .catch(err=>reject(err))
        });
    }


    /**
     * validate if the pm is a valid pm or not
     * if the pm is not valid return false
     * else return true
     * @param {object} data The object having all the details of the pm
     * which will be used for verification we are expecting email id 
     * and password
     */
    validateCredentials(data){
        return new Promise((resolve, reject)=>{
            pm.getPasswordForEmail(data.email)
                .then(doc=>
                    {
                        if(doc === null)
                            resolve(false)
                        else
                            resolve(doc.password === data.password)
                    })
                .catch(err=>{
                    reject(err)
                })
        })
    }

}
