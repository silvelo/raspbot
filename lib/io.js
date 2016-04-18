'use strict'

const fs = require('fs')

let readFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) return reject(err)
            resolve(data)
        })
    })

}

let checkFile = (file) => {
    return new Promise((resolve, reject) => {
        fs.access(file, fs.F_OK | fs.R_OK, (err) => {
            if (err) return reject(err)
            return resolve()
        })
    })
}

exports.watch = (userId, file, bot) => {
    return new Promise((resolve, reject) => {
        checkFile(file)
            .then(() => {
                resolve(fs.watch(file, (event, filename) => {
                    readFile(file)
                        .then((data) => {
                            let message = `File ${filename} has been ${event} with data:\n ${data}`
                            bot.sendMessage(userId, message)
                        }, (err) => {
                            let message = `File ${filename} has been ${event} and error ocurred:\n ${err}`
                            bot.sendMessage(userId, message)
                        })
                }))
            }, (err) => {
                reject(err)
            })
    })
}