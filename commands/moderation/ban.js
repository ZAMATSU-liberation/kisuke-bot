const {PermissionFlagsBits} = require('discord.js');
const { EmbedBuilder } = require('discord.js');
require('dotenv').config();
module.exports = {
    name : "ban",
    description : "ban the member from the guild",

    async execute(message,args){
        const member = message.mentions.members.first();

        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)){
            return message.reply("you dont have perms to ban the member")

            
        
        }

        if (!member){
                return message.reply("mention the member you want to ban");
            }
        else{
            try{
                await member.ban();
               const embed = new EmbedBuilder()
               .setTitle(`${member.user.tag} has been banned from the server by ${message.author.tag}`)
               .setColor('#e74c3c')
               .setFooter({text : "Developed by Zamatsu"})
               .setTimestamp();

               message.channel.send({
                    embeds : [embed]
                });
            }catch(error){
                return message.reply(`i cant this member ${member.tag}`)
            }
        }

    }
}

