import datetime
import discord
from discord.ext import commands
import json
from random import randint

with open('config.json') as conf:
    data = json.load(conf)

bot = discord.Client()
prefix = data["prefix"]
guilds = {}
    
@bot.event
async def on_ready():
    log("Ready!")
    
@bot.event
async def on_message(message):
    if message.author.bot or message.channel.name != "askouijatest":
        return
    
    log(message.content)

    if message.guild not in guilds:
        # ik this is a bad format but it works
        # key = guild name
        # arr[0] = is_answering_qusetion
        # arr[1] = current_answer
        # arr[2] = previous_author
        guilds[message.guild] = [False, '', None]
        log("Created Ouija in Guild: " + message.guild.name)

    is_answering_question = guilds[message.guild][0]
    current_answer = guilds[message.guild][1]
    previous_author = guilds[message.guild][2]
    log(str(is_answering_question))
    if is_answering_question:
        if len(message.content) != 1 or previous_author == message.author:
            await message.delete()
        if message.content == "goodbye" and previous_author != message.author:
            is_answering_question = False
            await message.channel.send("`The answer is: " + current_answer + "`")
            current_answer = ''
            previous_author = None
        else:
            current_answer += message.content
            previous_author = message.author
            
    elif not is_answering_question and message.content[:7] == prefix:
        await message.channel.send("`The question is: " + message.content[7:] + "`")
        is_answering_question = True

    guilds[message.guild][0] = is_answering_question
    guilds[message.guild][1] = current_answer
    guilds[message.guild][2] = previous_author
    
def log(message):
    time = datetime.datetime.now()
    hour = str(time.hour) if time.hour >= 10 else "0" + str(time.hour)
    minute = str(time.minute) if time.minute >= 10 else "0" + str(time.minute) 
    second = str(time.second) if time.second >= 10 else "0" + str(time.second)  
    print("[" + hour + ":" + minute + ":" + second + "] " + message)
    
bot.run('NDcyMTkwMjQ3NjgyMzEwMTYy.D3s-sw.ZWDlxQMsp7U2fqC8L9Ne4GFiFuQ')


    
