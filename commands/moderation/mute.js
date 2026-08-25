const {PermissionFlagsBits} = require('discord.js');

require('dotenv').config();
module.exports = {
    name : "mute",
    description : "ban the member from the guild",

    async execute(message,args){
        const member = message.mentions.members.first();
        const minutes = parseInt(args[1]);    
        if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)){
            return message.reply("you dont have perms to mute the member")

            
        
        }

        if (!member){
            return message.reply("mention the member you want to mute");
        }
        else{
            await member.timeout({'duration':'reason'});
            message.reply(`${member} muted for ${duration}`);
        }
    }
};

