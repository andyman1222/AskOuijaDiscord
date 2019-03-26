import discord
from discord.ext import commands
import json
from random import randint

with open('config.json') as conf:
    data = json.load(conf)

bot = discord.Client()
prefix = data["prefix"]
is_answering_question = False
current_answer = ''
graphs = {}
previous_author = None
    
@bot.event
async def on_ready():
    print('Logged in as')
    print(bot.user.name)
    print(bot.user.id)
    print('------')
    
@bot.event
async def on_message(message):
    if message.author.bot:
        return

    global is_answering_question
    global current_answer
    global previous_author
    
    if is_answering_question:
        if len(message.content) != 1 or previous_author == message.author:
            await message.delete()
        elif message.content == "goodbye" and previous_author != message_author:
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

bot.run('nice try bucko')
