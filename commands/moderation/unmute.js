const {PermissionFlagsBits} = require('discord.js');
module.exports= {
    name : 'unmute',
    description : 'unmutes the member',
    async execute(message,args){
        const member = message.mentions.members.first();
        if (!member){
            return message.reply('missing target user');
        }
        if (!message.member.permissions.has(PermissionFlagsBits.MuteMembers)){
            return message.reply('missing perms')
        }
    }
}