#RASPBOT


![https://david-dm.org/silvelo/raspbot.svg](https://david-dm.org/silvelo/raspbot.svg)

Raspbot is a simple program to listen Telegram bot channel.
Programmed in Javascript and use [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api#new_TelegramBot_new) to make the calls to API

[Gitter](https://gitter.im/raspbot/Lobby)

This program was tested on Raspberry Pi B+ , with raspbian and node v4.2.1

####**Prerequisites**
 
- [Telegram bot](https://core.telegram.org/bots)

###**Install**
- Install the last Node.js stable version.
    - [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- Get a copy of the code and install Node dependencies.

```
git clone https://github.com/silvelo/raspbot
cd raspbot
npm i
```

###**Configure**

- Rename settings.template.json to settings.json and complete the data.

###**Use**
- Start
```
node telebot.js
```

###**Features**

####**/execute** command
Execute command in the server and return the output of command, if error return error message. 


###**TODO**
- Security

##**Version**

**2.0**
- All code are refactoring and now use JavaScript, with the same features on **v1.0**

**1.0**
- Can execute commands in system.


##**License**
The MIT License (MIT)

Copyright (c) 2016 [Arturo Silvelo] (https://github.com/silvelo)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
