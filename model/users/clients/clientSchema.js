var mongoose = require('mongoose');
var winston = require('../../../shared/logger');
var connection = require('../../db');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    authKeys: {
        type: Array,
        default: []
    },
    notes: [{
        type: String,
        default: "",
        trim: true
    }]
});


schema.index({email: 1},{unique: true});

var model = connection.model('clients', schema);


model.once('index', (err)=>{
    if(err){
        winston.info('there is a problem with client schema index ');
        winston.error(err.stack)
    }
    else{
        winston.info('client schema successfully indexed');
    }
});

module.exports = model;