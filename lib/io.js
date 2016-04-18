'use strict'

const fs = require('fs')

let readFile = (file) => {
    let execute = (resolve, reject) => fs.readFile(file, 'utf8', (err, data) => (err) ? reject(err) : resolve(data))
    return new Promise(execute)
}

let checkFile = (file) => {
    let execute = (resolve, reject) => fs.access(file, fs.F_OK | fs.R_OK, (err) => (err) ? reject(err) : resolve())
    return new Promise(execute)
}


exports.watch = (userId, file, bot) => {
    let execute = (resolve, reject) => {
        checkFile(file)
            .then(() => resolve(fs.watch(file, (event, filename) => readFile(file)
                .then(data => bot.sendMessage(userId, `File ${filename} has been ${event} with data:\n ${data}`))
                .catch(err => bot.sendMessage(userId, `File ${filename} has been ${event} and error ocurred:\n ${err}`))
            )))
            .catch(err => reject(err))
    }

    return new Promise(execute)

}