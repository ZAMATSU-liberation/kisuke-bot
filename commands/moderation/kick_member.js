const {PermissionFlagsBits} = require('discord.js')
require('dotenv').config();
module.exports = {
    name : "kick",
    description : "ban the member from the guild",

    async execute(message,args){
        const member = message.mentions.members.first();

        if (!message.member.permissions.has(PermissionFlagsBits.KickMembers)){
            return message.reply("you dont have perms to kick the member")

            
        
        }

        if (!member){
                return message.reply("mention the member you want to kick");
            }
        else{
            await member.kick({'reason': "violation of rules"})
            message.reply(`${member.user.tag} has been banned from server`)
        }
    }
}

