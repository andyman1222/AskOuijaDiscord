// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

var users = new Array(), questions = new Array(), answers = new Array(), guilds = new Array(), askingQuestion = new Array(), prevUser = new Array();

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame('/r/AskOuija');
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  guilds.push();
  for(i = 0; i < channels.length; i++){
    if(channels[i].name == "askouija") return;
  }
  guild.createChannel("askouija", "text");
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on("message", async message => {
  var index;
  if(guilds.indexOf(message.guild.id) == -1){
    guilds.push(message.guild.id);
    answers.push("");
    questions.push("");
    askingQuestion.push(false);
    users.push(message.author.username);
  }
  index = guilds.indexOf(message.guild.id);
  if(!(message.channel.name == "askouija")) return;
  if(message.author.bot){
    if(message.content.indexOf("\n\nThe answer is: ") !== -1) return;//message.pin();
      return;
  }
  if(askingQuestion[index] == false){
    if(message.content.indexOf(config.prefix) !== 0) return;
    else if(message.content.toLowerCase() == "ouija, help"){
      message.author.sendMessage("`Find out more on reddit.com/r/AskOuija\nHOW TO DO IT: ask a question and have it answered by Ouija, or to help answer a question, send a 1 letter response or \"Goodbye\" to end the response.`");
      return message.delete();
    }
    else{
      questions[index] = message.content.substr(6, message.content.length);
      askingQuestion[index] = true;
      users[index] = message.author.username;
      return message.channel.send("The question, asked by @" + users[index] + ", was: \n\n`" + questions[index] + "`");
    }
  }
  else{
    if(message.content.indexOf(config.prefix) !== -1){
      if(message.content.substr(7, message.content.length).toLowerCase() == "question"){
        message.author.sendMessage("The question, asked by @" + users[index] + ", was: \n\n`" + questions[index] + "`");
        message.delete();
        return;
      }
      else if (message.content.substr(7, message.content.length).toLowerCase() == "reset" && message.member.highestRole.hasPermission("ADMINISTRATOR")){
        askingQuestion[index] = false;
        message.channel.send("The question, asked by @" + users[index] + ", was: \n\n`" + questions[index] + "`\n\nThe question was reset by the administrator.");
        questions[index] = "";
        answers[index] = "";
        users[index] = "";
        return;
      }
    }
    else if(message.content.toLowerCase().indexOf("goodbye") != -1){
      askingQuestion[index] = false;
      message.author.sendMessage("The question, asked by " + messageusers[index] + ", was: \n\n`" + questions[index] + "`\n\nThe answer is: \n\n`" + answers[index] + "`");
      questions[index] = "";
      answers[index] = "";
      users[index] = "";
      return;
    }
    else if(message.author.username == users[index]){
      console.log(message.content);
      return message.delete();
    }
    else if(message.author.username == prevUser[index]){
      return message.delete();
    }
    else if(message.content.charAt(0) > 255){
      answers[index] += message.content;
      prevUser[index] = message.author.username;
    }
    else if(message.content.charAt(0) == '<' && message.content.charAt(1) == ':' && message.content.charAt(messge.content.length-1) == '>'){
      var i = 2;
      var id = "";
      for(i = 2; i < message.content.length && message.charAt(i) != ':'; i++){
        
      }
      if(i >= message.content.length){
        return message.delete();
      }
      else{
        for(i++; message.charAt(i) != '>'; i++){
          id += "" + message.charAt(i);
        }
        answers[index] += client.emojis.get(id);
        prevUser[index] = message.author.username;
      }
    }
    else if(message.content.length > 1){
      console.log(message.content);
      return message.delete();
    }
    else{
      answers[index] += message.content;
      prevUser[index] = message.author.username;
    } 
  }
});

client.login(config.token);
           