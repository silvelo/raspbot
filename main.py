import telebot, os, tempfile, subprocess
from telebot import util

#Get bot token
token = os.getenv('tokenBot')


#Get path
path = os.path.dirname(os.path.abspath(__file__))


bot = telebot.TeleBot(token)




#################################################
##############DEFINE COMMANDS#######################
#################################################
@bot.message_handler(commands=['execute'])
def execute(message):
    chat_id = message.chat.id
    commands = str(message.text).split(" ")[1:]
    executeCommand(commands, chat_id)


def executeCommand(command,chat_id):
    p = subprocess.Popen(command, stdout=subprocess.PIPE, shell=False)
    (output, err) = p.communicate()
    p_status = p.wait()

    sendMessage(output,chat_id)

def sendMessage(message, chat_id):
    with tempfile.NamedTemporaryFile() as temp:
        try:
            temp.write(message)
            temp.flush()
            temp.seek(0)
            doc = open(temp.name, 'rb').read()
            splitted_text = util.split_string(doc, 3000)
            for text in splitted_text:
                bot.send_message(chat_id, text)

        except Exception as e:
            print e
        
        finally:
            temp.close()

bot.polling(none_stop=True)