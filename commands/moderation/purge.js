const {PermissionFlagsBits} = require('discord.js');
const { EmbedBuilder } = require('discord.js');
module.exports = {
    name : "purge",

    async execute(message,args){
        if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)){
            return message.reply(" you dont have Manage Messages permissions");
        }
        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)){
            return message.reply("I don't have Manage messages permissons")
        }

        
    

        const amount = parseInt(args[0]);

        if(isNaN(amount) || amount<1 || amount>1000)
            return message.reply("purge limit is max 1000 messages once at time")
        

        await message.channel.bulkDelete(amount);

        const notify_them = message.channel.send(`deleted ${amount} messages successfully!`);


    }
};

// slash commands { only for moderations tho}