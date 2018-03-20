var mongoose = require('mongoose');

var connection = mongoose.createConnection("mongodb://codeworks0301:password@ds119449.mlab.com:19449/juyrna","");

connection.on('connected', ()=>{
    console.log('connected to database');
});

connection.on('disconnected', ()=>{
    console.log('disconnected from database');
});

connection.on('error', (err)=>{
    console.log('an error occured in the database connection ', err);
});


process.on('SIGINT', ()=>{
    connection.close(()=>{
        console.log('closing connection to mongodb as node is getting shut down');
        process.abort(0);
    });
});


module.exports = connection;