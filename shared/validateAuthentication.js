/**
 * ==================== ALGO =========================
 * 
 * The code is going to take in the cookies,
 * it is going to check the cookies such as 
 * email and token
 * if the email is a valid email and 
 * token is a valid token then it means
 * the user is a registered user
 * Then I have to check if the user is 
 * actually authorized to view the page.
 * 
 * 
 * ===== CODES =========
 * 0 means client
 * 1 means peer motivator
 * 2 means admin
 * 
 * 
 */

const client = require('../model/users/clients/client')
const pm = require('../model/users/peermotivators/peermotivator')

const winston = require('./logger')

class RouteGuard {
    constructor(cookies, userCode){
        this.cookies = cookies
        this.email = this.cookies.email
        this.token = this.cookies.token

        this.userCode = userCode
        this.client = client
        this.pm = pm
    }//end of constructor


    /**
     * This is the init method, returns true or false
     * that is is the user authenticated or not
     */
    async checkAuthentication(){
        let validity = await this.validateUserAgainstEmailAndToken(this.email, this.token, this.userCode, this.client, this.pm)
        return validity
    }//end of init



    /**
     * This method validates a user, that is checks if the user is 
     * a legit user or not
     * 
     * @param {String} email the email to be checked for validity and identity of the user
     * @param {String} token the token stored in the brower cookie
     * @param {Number} userCode the user code check top of document to understand it
     * @param {Class} client the client class
     * @param {Class} pm the pm class
     */
    async validateUserAgainstEmailAndToken(email, token, userCode, client, pm){
        let validity = false
        switch(userCode){
            case 0:
                validity = await this.doesEmailExistInSystem(email, client)
                break
            case 1:
                validity = await this.doesEmailExistInSystem(email, pm)
                break
        }
        if(validity === false){
            return false
        }
        else{
            switch(userCode){
                case 0:
                    return await this.isTokenValid(this.email, token, client)
                case 1:
                    return await this.isTokenValid(this.email, token, pm)
            }
        }
    }//end of validateUserAgainstEmailAndToken

    
    /**
     * this method checks if the token supplied is a valid token or not
     * returns boolean
     * @param {String} email the email address which is to be tested with,
     * to identify the user
     * @param {String} token the token which is in the cookie, to be tested against the server token
     * @param {String} user the user group class, whose methods are to be used
     */
    async isTokenValid(email, token, user){
        try {
            let tokenInServer = await user.getAuthToken(email)
            if(tokenInServer.includes(token))
                return true
            return false
        } catch (error) {
            return false   
        }
    }//end of isTokenValid



    /**
     * Check if the email is actually present in the system
     * @param {String} email the email whose validity is to be tested
     * @param {String} user the user group, class, whose functions are to be used
     */
    async doesEmailExistInSystem(email, user){
        try {
            let validity = await user.doesEmailExist(email)
            return validity
        } catch (error) {
            winston.error(error.stack)
        }
    }//end of doesEmailExistInSystem

}
module.exports = RouteGuard