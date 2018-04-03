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
    start_time: {
        type: Number,
        required: true
    },
    end_time: {
        type: Number,
        required: true
    }
});


schema.index({email: 1},{unique: true});

var model = connection.model('peermotivator', schema);


model.once('index', (err)=>{
    if(err){
        winston.info('there is a problem with Peermotivator schema index '+ err);
    }
    else{
        winston.info('Peermotivator schema successfully indexed');
    }
});

module.exports = model;