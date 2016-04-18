'use strict'

const exec = require('child_process').exec
const io = require('./io.js')
const util = require('./utils.js')
const Watch = require('./watch')


const watch = new Watch()

let echoFunction = (msg, match, bot) => {
    let message = match[1]
    let chatID = msg.chat.id
    return bot.sendMessage(chatID, message)
}

let executeFunction = (msg, match, bot) => {
    let command = match[1]
    let chatID = msg.chat.id

    const child = exec(command, (err, stdout, stderr) => {
        let resp = (err) ? stderr : stdout
        bot.sendMessage(chatID, resp)
    })
    return bot.sendMessage(chatID, `The pid is : ${child.pid}`)

}

let watchArray = []



let _watchFunction = (file, chatID, value, watchEvent) => {
    let message
    if (value) {
        message = `Now you get the changes on ${file}`
        let position = util.getIndexOfArray(watchArray, chatID)
        if (position === -1) {
            watchArray.push({
                id: chatID,
                data: [{
                    id: value,
                    watcher: watchEvent
                }]
            })
        } else {
            watchArray[position].data.push({
                id: value,
                watcher: watchEvent
            })
        }
    } else message = 'The file is already watch'


    return message

}

exports.watchAllFiles = function watchAllFiles(chatID, file, bot) {
    io.watch(chatID, file, bot)
        .then((watchEvent) => {
            let message = _watchFunction(file, chatID, true, watchEvent)
            console.log(message)
        })
        .catch(() => console.error('Cannot access to file'))
}

function watchFunction(msg, match, bot) {
    let file = match[1]
    let chatID = msg.chat.id

    io.watch(chatID, file, bot)
        .then((watchEvent) => {
            watch.register(chatID, file)
                .then((value) => {
                    let message = _watchFunction(file, chatID, value, watchEvent)
                    bot.sendMessage(chatID, message)
                })
                .catch(() => bot.sendMessage(chatID, 'err'))
        })
        .catch(() => bot.sendMessage(chatID, 'Cannot access to file'))
}



let listWatchFunction = () => {


}

let unwatchFunction = (msg, match, bot) => {
    let file = match[1]
    let chatID = msg.chat.id
    let position = util.getIndexOfArray(watchArray, chatID)
    let array = watchArray[position].data

    watch.searchOne(chatID, file)
        .then((value) => {
            let index = util.getIndexOfArray(array, value)
            array[index].watcher.close()
            watch.unregister(chatID, file)
                .then((value) => {
                    let msg = value ? 'File unwatched' : 'You are not watching this file'
                    bot.sendMessage(chatID, msg)
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

exports.unwatchFunction = {
    regExp: /\/unwatch (.+)/,
    function: unwatchFunction
}
exports.echoFunction = {
    regExp: /\/echo (.+)/,
    function: echoFunction
}
exports.executeFunction = {
    regExp: /\/execute (.+)/,
    function: executeFunction
}
exports.listWatchFunction = {
    regExp: /\/listwatch/,
    function: listWatchFunction
}
exports.watchFunction = {
    regExp: /\/watch (.+)/,
    function: watchFunction
}

exports.functions = [
    {
        regExp: /\/unwatch (.+)/,
        function: unwatchFunction
    }, {
        regExp: /\/echo (.+)/,
        function: echoFunction
    }, {
        regExp: /\/execute (.+)/,
        function: executeFunction
    }, {
        regExp: /\/listwatch/,
        function: listWatchFunction
    }, {
        regExp: /\/watch (.+)/,
        function: watchFunction
    }]