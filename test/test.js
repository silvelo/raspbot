const onMessage = require('../lib/on-message.js')
const Bot = require('../lib/bot.js')
const assert = require('assert')
const is = require('is')

const TOKEN_MOCHA = process.env.TEST_MOCHA_TOKEN

describe('#onMessage', function testSuite() {
    const mochabot = new Bot(TOKEN_MOCHA)

    it('echo', function test() {
        console.info('Type /echo text')
        return mochabot.onMessage(onMessage.echoFunction.regExp, onMessage.echoFunction.function)
            .then(function (resp) {
                assert.ok(is.object(resp))
            })
    })

    it('execute', function test() {
        console.info('Type /execute ls')
        return mochabot.onMessage(onMessage.executeFunction.regExp, onMessage.executeFunction.function)
            .then(function (resp) {
                assert.ok(is.object(resp))
            })
    })



})