'use strict'

const winston = require('winston')
const moment = require('moment')
const config = require('./config')

let timestamp = () => {
    return moment(new Date()).format('LLL')
}

let formatter = (options) => {
    return `[${options.timestamp()}] [${options.level}] ${options.message}`
}

/**Create logger */
module.exports = new winston.Logger({
    transports: [
        new (winston.transports.Console)(
            {
                timestamp: timestamp,
                formatter: formatter
            }
            ),
        new (winston.transports.File)(
            {
                timestamp: timestamp,
                filename: `${__dirname}/../logs/${config.logFile}`,
                json: false,
                formatter: formatter
            })
    ]
})