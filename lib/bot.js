'use strict'
const TelegramBot = require('node-telegram-bot-api')
const logger = require('./logger.js')
const sar = require('./utils.js').searchAndRegister

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
        if (callback.name === 'watchFunction') this.registerAll()
        let execute = (resolve) => {
            this.bot.onText(regexp, (msg, match) => {
                logger.info(`Processing message : ${match[0]} from user: ${msg.from.id}`)
                resolve(callback(msg, match, this))
            })
        }
        return new Promise(execute)
    }

    // TODO:
    registerAll() {
        logger.debug('Register all')
        sar(this.bot)

    }

    sendMessage(chatID, message, userID) {
        logger.info(`Sending message to ${userID} with content:\n${message}`)
        return this.bot.sendMessage(chatID, message)
    }
}

module.exports = Bot