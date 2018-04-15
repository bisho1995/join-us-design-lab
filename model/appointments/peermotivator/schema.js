var mongoose = require('mongoose');
var winston = require('../../../shared/logger');
var connection = require('../../db')

let schema = mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    peermotivators: [
        {
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
            },
            client_id: {
                type: String,
                default: 'default_id'
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