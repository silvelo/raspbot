#RASPBOT

Raspbot is a simple program to handle a Telegram bot and execute actions through messages sent to bot.
Programmed in Javascript and use [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api#new_TelegramBot_new) to make the calls to API

This program was tested on Raspberry Pi B+ , with raspbian and node v4.2.1


####**Prerequisites**

- [Telegram bot](https://core.telegram.org/bots)

###**Install**
- Install the last Node.js stable version.
    - [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Install the last Mongo stable version.
    - [https://www.mongodb.org/downloads](https://www.mongodb.org/downloads)
- Get a copy of the code and install Node dependencies.

```
git clone https://github.com/silvelo/raspbot
cd raspbot
npm i
```

##**Configure**

- Rename *settings.template.json* to *settings.json* and complete the data.

##**Use**
- Test

To run the test, you need to configure the next enviroment variable:
```
export TEST_MOCHA_TOKEN=BOT_TOKEN
```
Now you can execute the test:
```
npm test
```
And type the commands that appear in the shell. [At the moment](https://core.telegram.org/bots/faq#why-doesn-39t-my-bot-see-messages-from-other-bots), the bots
cannot read messages from other bots
and we need to type the commands manually to execute the test.


- Development
```
npm run dev
```


- Start
```
npm start
```


##**Features**

####**/execute** command
Execute *command* in the server and return the output of command, if error return error message.

####**/watch** file
Watch changes on *file*

####**/unwatch** file
Stop watches changes on *file*

###Watch
If the server restart, automatically all files will be registered again.

##**TODO**

- Watch(Working)
- Security


##**Knowledge issues**
- When use watch if some change happens you receive two messages , this [issue](https://github.com/mikeal/watch/issues/14) is a problem of *fs* library.

##[Version](https://github.com/silvelo/raspbot/releases)


##**License**
The MIT License (MIT)

Copyright (c) 2016 [silvelo] (https://github.com/silvelo)
