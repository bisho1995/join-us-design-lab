var fs = require('fs');
var winston = require('winston');


var config = winston.config;
var logger = new winston.Logger({
    transports: [
        new (winston.transports.Console)(
            {
                timestamp: function() {
                  return Date.now();
                },
                formatter: function(options) {
                    return options.timestamp() + ' ' +
                    config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                    (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
                }
            }
        ),
        new (winston.transports.File)(
            {
                timestamp: function() {
                    return Date.now();
                  },
                  formatter: function(options) {
                    return options.timestamp() + ' ' +
                    config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                    (options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
                },
                stream: fs.createWriteStream('./log/log.txt', {flags: 'a'})
            }
        )
    ]
});


logger.on('error', (err)=>{
    console.log('error with winston ' + err);
});


module.exports = logger;