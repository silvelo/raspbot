'use strict'

const exec = require('child_process').exec
const io = require('./io.js')
let Watch = require('./watch')

let watch = new Watch()

let echoFunction = (msg, match, bot) => {
    let message = match[1]
    let fromId = msg.from.id
    bot.sendMessage(fromId, message)
}

let executeFunction = (msg, match, bot) => {
    let command = match[1]
    let fromId = msg.from.id

    const child = exec(command, (err, stdout, stderr) => {
        let resp = (err) ? stderr : stdout
        bot.sendMessage(fromId, resp)
    })
    bot.sendMessage(fromId, `The pid is : ${child.pid}`)
}

let watchArray = []

let getIndexOfArray = (array, id) => {
    array.forEach((element, index) => {
        console.log(`Ok, ${index}`)
        if (element.id === id) return index
    })
    console.log('Ok, -1')
    return -1
}

let watchFunction = (msg, match, bot) => {
    let file = match[1]
    let userId = msg.from.id
    io.watch(userId, file, bot)
        .then((watchEvent) => {
            watch.register(userId, file)
                .then((value) => {
                    let message
                    if (value) {
                        message = `Now you get the changes on ${file}`
                        console.log(watchEvent)
                        console.log(getIndexOfArray(watchArray, userId))
                        /*
                
                    watchArray.push({
                        id: userId,
                        data: {
                            id:value,
                            watcheEvent:watchEvent
                        }
                    })*/


                    } else {
                        message = 'The file is already watch'
                    }
                    bot.sendMessage(userId, message)

                }, (err) => {
                    bot.sendMessage(userId, 'err')
                    console.log(err)
                })
        },
        (err) => {
            bot.sendMessage(userId, 'Cannot access to file')
            console.log(err)
        })
}

/*let addWatch = (id, file) => {
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
*/

let listWatchFunction = (msg, match, bot) => {


}
/**
 * BD -> find userId -> return to message
 */

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

let unwatchFunction = (msg, match, bot) => {

}
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


module.exports = [{
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