'use strict'
const Watch = require('./watch.js')
const waf = require('./on-message.js').watchAllFiles
const w = new Watch()
const logger = require('./logger.js')

let getIndexOfArray = (array, id) => {
    return array.findIndex(element => {
        return element.id === id
    })
}



let searchAndRegister = (bot) => {
    w.search()
        .then(result => {
            result.forEach(element => {
                waf(element.userId, element.file, bot)

            })
        })

}
exports.searchAndRegister = searchAndRegister
exports.getIndexOfArray = getIndexOfArray