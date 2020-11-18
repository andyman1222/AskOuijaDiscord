# AskOuijaDiscord
A Discord bot to emulate https://reddit.com/r/askouija in a Discord channel
## How to use in your server
1. In `#askouija`, Type `Ouija, ` and a question you want Ouija to ask.
2. Everyone in the channel can now reply 1 character responses to answer the question
3. type `goodbye` to end answering and see your answer.
* If you made the question (or if you're an admin), you can use `Ouija, reset` to stop question answering.
* If you made the current question, you cannot help answer at all.
* If you just added a letter, you have to wait for someone else to add a letter brfore you can continue or finish answering.
* You can view the current question being asked with `Ouija, question`.
## How to use your own bot (needs node.js or python and discord.py)
Note: these instructions are rather outdated, for the old node.js version of the bot. I recommend using the python version- simply install discord.py via pip and run run.py (and also add your token).
1. go into `config.json` and add your bot key where needed
2. download and modify `app.js` to your liking
3. use `npm install discord.js` to install dependencies
4. use `node app.js` to run your bot
5. go to https://discordapp.com/oauth2/authorize?client_id=CLIENTID&scope=bot&permissions=1 to add your bot to your server
## Todo
* ~~prevent users from replying to their own question, spamming responses~~
* add emojis to be answerable
* fix glitch that causes bot to crash for unknown reason
