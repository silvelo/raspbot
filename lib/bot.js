'use strict'
const TelegramBot = require('node-telegram-bot-api')
const logger = require('./logger.js')

/** class for manage bot */
class Bot {

    constructor(token) {
        this.bot = new TelegramBot(token, {
            polling: true
        })
        logger.info('The bot is listening')
    }

    /**
     * This method create a new regexp for bot
     * @param {string} regexp - The regular expresion
     * @param {function} callback - The function when catch message
     */
    onMessage(regexp, callback) {
        this.bot.onText(regexp, (msg, match) => {
            logger.info(`Processing message : ${match[0]} from user: ${msg.from.id}`)
            callback(msg, match, this.bot)
        })
    }

    sendMessage(id, message) {
        logger.info(`Sending message to ${id} with content:\n${message}`)
        this.bot.sendMessage(id, message)
    }




}

module.exports = Bot