'use strict'

const TelegramBot = require('node-telegram-bot-api')
const exec = require('child_process').exec
const logger = require('./lib/logger.js')
const config = require('./lib/config.js')
const io = require('./lib/io.js')
const Watch = require('./lib/watch.js')

/**Create bot */
const bot = new TelegramBot(config.token, {
    polling: true
})
logger.info('Bot is listening')

let watches = []
/**
 * TODO: 
 */
let init = () => {
    let w = new Watch()
    w.search()
        .then(
        (value) => console.log(value)
        )
}

init()


bot.onText(/\/execute (.+)/, function(msg, match) {
    let command = match[1]
    let fromId = msg.from.id
    exec(command, function(error, stdout, stderr) {
        let message = `${msg.from.username} : "${msg.text}" `
        let resp = ''
        if (error !== null) {
            resp = stderr
            message += 'with error'
            logger.warn(message)
        } else {
            resp = stdout
            message += 'successful'
            logger.info(message)
        }

        bot.sendMessage(fromId, resp)
    })
})

/**
 * TODO: Move to utils
 */
let isExists = (id, array) => {
    let i = undefined
    array.forEach((element, index) => {
        if (element.userId === id) {
            i = index
            return
        }
    })
    return i
}

let addWatch = (id, file) => {
    console.log('Entra')
    let index = isExists(id, watches)
    if (index === undefined) {
        watches.push({
            userId: id,
            data: [{
                file: file,
                watcher: io.watch(bot, id, file)
            }]
        })
    } else watches[index].data.push({
        file: file,
        watcher: io.watch(bot, id, file)
    })
}

/** 
 *  TODO : Comment issue with twice sends and register in file, and add unregister command
 * */
/*bot.onText(/\/watch (.+)/, function(msg, match) {
    let file = match[1]
    let fromId = msg.from.id
    let message = `Now you get the changes on ${file}`
    bot.sendMessage(fromId, message)
    mongo.register(fromId, file)
    addWatch(fromId, file)
})*/

/** 
 *  TODO : Comment issue with twice sends and register in file, and add unregister command
 * */
/*bot.onText(/\/listWatch/, function(msg) {
    let fromId = msg.from.id
    let index = isExists(fromId, watches)
    let message = ''
    if (index != undefined) {
        message += `You are watching this files:\n`

        watches[index].data.forEach((element, index) => {
            message += `${element.file} - ${index}\n`
        })
    } else {
        message = 'You arent watching files'
    }
    bot.sendMessage(fromId, message)
})*/

/** 
 * TODO : Unwatch files
 * 
 * */
/*bot.onText(/\/unwatch (.+)/, function(msg, match) {
    let id = match[1]
    let fromId = msg.from.id
    let index = isExists(fromId, watches)
    let message = ''
    if (index != undefined) {
        message += `The watch on file :${watches[index].data[id].file} was removed`
        console.log(watches[index].data[id].watcher.close())
        watches[index].data.splice(index, 1)

    } else {
        message = 'This watch doesnt exists'
    }
    bot.sendMessage(fromId, message)
})*/