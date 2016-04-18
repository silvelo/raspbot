const onMessage = require('../lib/on-message.js')
const Bot = require('../lib/bot.js')

const TOKEN_MOCHA = process.env.TEST_MOCHA_TOKEN

describe('#test', function testSuite() {
    const mochabot = new Bot(TOKEN_MOCHA)

    it('echo', function test(done) {
        console.info('Type /echo text')
        mochabot.onMessage(onMessage.echoFunction.regExp, onMessage.echoFunction.function)
            .then(result => {
                if (result.text === 'text') done()
                else throw 'No text in message'

            })
    })

    it('execute', function test(done) {
        console.info('Type /execute ls')
        mochabot.onMessage(onMessage.executeFunction.regExp, onMessage.executeFunction.function)
            .then(result => {
                if (result.text.indexOf('The pid is') !== -1 ) done()
                else throw 'No text in message'
            })
    })

})