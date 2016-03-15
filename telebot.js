'use strict'

const winston = require('winston')
const moment = require('moment')
const configurationFile = 'settings.json'
const fs = require('fs')
const TelegramBot = require('node-telegram-bot-api')
const exec = require('child_process').exec

/**Load Settings */
const configuration = JSON.parse(fs.readFileSync(configurationFile))

let timestamp = () => {
    return moment(new Date()).format('LLL')
}

let formatter = (options) => {
    return `[${options.timestamp()}] [${options.level}] ${options.message}`
}

/**Create logger */
const logger = new winston.Logger({
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
                filename: configuration.logFile,
                json: false,
                formatter: formatter
            })
    ]
})

/**Create bot */
const bot = new TelegramBot(configuration.token, { polling: true })
logger.info('Bot is listening')

bot.onText(/\/execute (.+)/, function (msg, match) {
    let command = match[1]
    let fromId = msg.from.id
    exec(command, function (error, stdout, stderr) {
        let message = `${msg.from.username} : "${msg.text}" `
        let resp = ''
        if (error !== null) {
            resp = stderr
            message += `with error`
            logger.warn(message)
        } else {
            resp = stdout
            message += `successful`
            logger.info(message)
        }
        
        bot.sendMessage(fromId, resp)
    })
})