const { PermissionFlagsBits} = require('discord.js');
const {EmbedBuilder} = require('discord.js');
module.exports = {
    name : 'lock',
    description : 'lock the channel for mods and owners',
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

                    SendMessages : false

                }
            );

            const embed = new EmbedBuilder()
                .setTitle('successfully locked the channel')
                .setColor("Random")
                .setFooter({
                    text : `locked by ${message.author.tag}`
                })

            await message.channel.send({embeds : [embed]});

        }catch(error){
            console.error(error);

            message.reply('i couldnt lock this channel ; `missing certain Permissions`')
        }
        
    }
}