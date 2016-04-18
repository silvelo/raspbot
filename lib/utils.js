'use strict'
const Watch = require('./watch.js')
const waf = require('./on-message.js').watchAllFiles

const watch = new Watch()

let getIndexOfArray = (array, id) => array.findIndex(element => element.id === id)

let searchAndRegister = (bot) => watch.search()
    .then(result => result.forEach(element => waf(element.userId, element.file, bot)))


exports.searchAndRegister = searchAndRegister
exports.getIndexOfArray = getIndexOfArray