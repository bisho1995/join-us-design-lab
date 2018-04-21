var mongoose = require('mongoose');
var winston = require('../shared/logger');
var connection = mongoose.createConnection("mongodb://localhost:27017/juyrna","");

connection.on('connected', ()=>{
    winston.info('connected to database');
});

connection.on('disconnected', ()=>{
    winston.error('disconnected from database');
});

connection.on('error', (err)=>{
    winston.info('an error occured in the database connection ');
    winston.error(err.stack)
});


process.on('SIGINT', ()=>{
    connection.close(()=>{
        winston.error('closing connection to mongodb as node is getting shut down');
        process.abort(0);
    });
});


module.exports = connection;