var mongoose = require('mongoose');
var winston = require('../../../shared/logger');
var connection = require('../../db')

let schema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    peermotivators: [
        {
            meetingId: {
                type: String,
                default: ""
            },
            client_id: {
                type: String,
                required: true,
                trim: true
            },
            id: {
                type: String
            },
            name: {
                type: String,
                required: true,
                trim: true
            },
            slot_timings: {
                start: {
                    type: Number, 
                    required: true
                },
                end: {
                    type: Number,
                    required: true
                }
            }
        }
    ]
})

schema.index({date: 1},{unique: true});

let model = connection.model('appointments', schema)

model.once('index', ()=>{
    winston.info('Successfully indexed appointments schema')
})

module.exports = model