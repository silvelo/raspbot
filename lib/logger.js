'use strict'

const Winston = require('winston')
const moment = require('moment')
const config = require('./config')
const mode = process.env.NODE_ENV

let timestamp = () => moment(new Date()).format('LLL')
let formatter = (options) =>  `[${options.timestamp()}] [${options.level}] ${options.message}`

let consoleLog = {
    timestamp: timestamp,
    formatter: formatter,
    level: 'debug'
}

let configureWinston = () => {
    const logger = new Winston.Logger({
        transports: [
            new (Winston.transports.File)({
                timestamp: timestamp,
                filename: `${__dirname}/../logs/${config.logFile}`,
                json: false,
                formatter: formatter
            })

        ]
    })

    if (mode === 'development') logger.add(Winston.transports.Console, consoleLog)
    logger.info(`You are in ${mode} enviroment`)
    return logger
}

/**Create logger */
module.exports = configureWinston()