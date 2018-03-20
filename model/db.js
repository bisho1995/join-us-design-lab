var mongoose = require('mongoose');
var winston = require('../shared/logger');
var connection = mongoose.createConnection("mongodb://codeworks0301:password@ds119449.mlab.com:19449/juyrna","");

connection.on('connected', ()=>{
    winston.info('connected to database');
});

connection.on('disconnected', ()=>{
    winston.error('disconnected from database');
});

connection.on('error', (err)=>{
    winston.error('an error occured in the database connection ', err);
});


process.on('SIGINT', ()=>{
    connection.close(()=>{
        winston.error('closing connection to mongodb as node is getting shut down');
        process.abort(0);
    });
});


module.exports = connection;