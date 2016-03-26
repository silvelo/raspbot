'use strict'

const fs = require('fs')
const Q = require('q')

let readFile = (file) => {
    return Q.nfcall(fs.readFile, file, 'utf-8')
}

module.exports.readFile = readFile

module.exports.deleteFile = () => {

}

module.exports.emptyFile = () => {

}

module.exports.watch = (bot, fromId, file) => {
    return fs.watch(file, (event, filename) => {
        if (filename) {
            readFile(filename).then(
                (result) => {
                    let message = `The ${filename} ${event} the data is : \n ${result}`
                    bot.sendMessage(fromId, message)
                }
            )
        }
    })
    
    
}

