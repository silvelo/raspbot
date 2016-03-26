'use strict'

const winston = require('winston')
const moment = require('moment')
const config = require('./config')
const path = require('path')

let appDir = path.dirname(require.main.filename)

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
                filename: `${appDir}/logs/${config.logFile}`,
                json: false,
                formatter: formatter
            })
    ]
})