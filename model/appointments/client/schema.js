var mongoose = require('mongoose');
var winston = require('../../../shared/logger');
var connection = require('../../db')

let schema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    date: {
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
    },
    peermotivator: {
        type: String,
        required: true
    },
    meetingId: {
        type: String,
        default: ""
    }
})

let model = connection.model('clientAppointment', schema)

module.exports = model