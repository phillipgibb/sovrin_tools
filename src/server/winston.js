var appRoot = require('app-root-path');
var winston = require('winston');
var {format} = require('winston');

const { Transform } = require('stream');

var options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  
};
var logger =  winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

class MyStream extends Transform {
  constructor({ level } = { level: 'info' }) {
    super({
      readableObjectMode: true,
      writableObjectMode: true
    });
   this.level = level;
  }

  _transform(chunk, encoding, callback) {
    this.push({
      level: this.level,
       message: `data: ${chunk}`
    });

    callback();
  }
}

const myStream = new MyStream({ level: 'error' });


process.stdin.setEncoding('utf-8');
process.stdin
  .pipe(myStream)
  .pipe(logger);

module.exports = logger;