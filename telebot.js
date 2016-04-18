'use strict'

/** Import library */
const config = require('./lib/config.js')
const Bot = require('./lib/bot.js')
const onMessage = require('./lib/on-message.js')

/** Generate bot */
const bot = new Bot(config.token)

/** Generate Command to listen */
onMessage.functions.forEach((element) => {
    bot.onMessage(element.regExp, element.function)
})