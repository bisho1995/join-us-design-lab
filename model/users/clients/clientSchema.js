var mongoose = require('mongoose');

var connection = require('../../db');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


var model = connection.model('clients', schema);

module.exports = model;