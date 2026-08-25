const {PermissionFlagsBits} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
module.exports = {
    name : 'unlock',
    description : 'unlock the channel for mods and owners',
    async execute(message,args){
        member = message.mentions.users.first();
        if (!message.member.permissions.has(PermissionFlagsBits.ManageChannels)){
            return message.channel({
                text : 'user missing permissions'
            });
        }
        try {
            await message.channel.PermissionOverwrites.edit(
                message.guild.roles.everyone,
            
                {

                    SendMessages : null

                }
            );

            const embed = new EmbedBuilder()
                .setTitle('successfully unlocked the channel')
                .setColor("Random")
                .setFooter({
                    text : `unlocked by ${message.author.tag}`
                })

            await message.channel.send({embeds : [embed]});

        }catch(error){
            console.error(error);

            message.reply('i couldnt unlock this channel : `missing Required Permissions`');
        }
        
    }
}