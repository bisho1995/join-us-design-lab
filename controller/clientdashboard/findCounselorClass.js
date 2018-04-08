'use strict'
var request = require('request')
module.exports = class FindCounselor {
    constructor(){
        this.url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=5000&type=physiotherapist&key=AIzaSyDJ4HQrwh2L_J3Zc1W2jQC88K4-TU8TJws&location=';
    }


    getKeyword(keyword){
        if(arguments.length !== 1)
            throw new Error('Function expects only one argument')
        return (keyword === null || keyword === "null" || keyword === undefined || keyword === "undefined" || keyword === "") ? '' : keyword.toString();
    }


    getPageToken(token){
        if(arguments.length !== 1)
            throw new Error('Function expects only one argument')
        if(typeof token !== 'string')
            throw new Error('Expected parameter to be String')
        if(token.split(' ').length !== 1)
            throw new Error('Expected parameter to be only one word, with no spaces')
        return (token === null || token === "null" || token === undefined || token === "undefined" || token === "") ? '' : token.toString();
    }

    
    getLocation(loc){
        return (loc === null || loc === "null" || loc === undefined || loc === "undefined" || loc === "") ? '22.530889,88.383418' : loc;
    }

    getPlacesDataFromGoogle(_url){
        return new Promise((resolve, reject)=>{
            request(_url, (err, resp, body)=>{
                if(err){
                    reject(err);
                }
                else{
                    resolve(JSON.parse(body));
                }
            });
        });
    }

    postReqWork(location, pageToken, keyword){
        let _url = this.url + this.getLocation(location)
        _url = _url + '&pagetoken=' + this.getPageToken(pageToken);
        _url = _url + '&keyword=' + this.getKeyword(keyword);
        return new Promise((resolve, reject)=>{
            this.getPlacesDataFromGoogle(_url)
                .then(data=>resolve(data))
                .catch(err=>reject(err))
        })
    }

}