var client = require('../../model/users/clients/client');
var winston = require('../../shared/logger');

module.exports = class LoginUser {
    constructor(){

    }

    /**
     * Checks if the email id supplied to the function is a 
     * registered email email id in the client database
     * If it is valid it returns true
     * @param {string} email The email id of the client
     */
     
        }
    


    /**
     * validate if the client is a valid client or not
     * if the client is not valid return false
     * else return true
     * @param {object} data The object having all the details of the user
     * which will be used for verification we are expecting email id 
     * and password
     */
    validateCredentials(data)
        return new Promise((resolve, reject)=>{
            client.getPasswordForEmail(data.email)
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
    


