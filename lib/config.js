'use strict'

const fs = require('fs')
const configurationFile = 'settings.json'

/**Load Settings */
module.exports = JSON.parse(fs.readFileSync(configurationFile))
