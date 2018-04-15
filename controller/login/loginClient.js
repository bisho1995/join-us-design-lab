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
    checkIfEmailExists(email){
        return new Promise((resolve, reject)=>{
            client.doesEmailExist(email)
                .then(data=>{
                    resolve(data)
                })
                .catch(err=>reject(err))
        });
    }//end of check email exists

    async setAuthToken(email, token){
        try {
            let doc = await client.setAuthToken(email, token)   
            return true
        } catch (error) {
            winston.error(error.stack)
            return false
        }
    }


    async validateAuthToken(email, token){
        try {
            let authTokens = await client.getAuthToken(email)
            if(authTokens.includes(token)){
                return true
            }
            else{
                return false
            }
        } catch (error) {
            winston.error(error.stack)
            return false
        }
    }


    /**
     * validate if the client is a valid client or not
     * if the client is not valid return false
     * else return true
     * @param {object} data The object having all the details of the user
     * which will be used for verification we are expecting email id 
     * and password
     */
    validateCredentials(data){
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
    }//end of validate credentials

}
