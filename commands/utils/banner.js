const {EmbedBuilder} = require('discord.js');
module.exports = {
    name : 'banner',
    description : 'displays the banner of mentioned user',
    async execute(message,args){
        const target = message.members.users.first();
        if(!target) return message.reply('missing target user');
        if (!target.banner){
            return message.reply(`${target.tag} doesnt have banner`);
        }
        const fetchuser = await fetch(target) || 'no user detected'
        const BannerUrl = target.BannerUrl(fetchuser);
        const BannerEmbed = new EmbedBuilder()
            .setTitle(`${fetchuser.username.tag}'s Banner`)
            .setImage(BannerUrl)
            .setColor("Random")
            .setTimestamp()
            .setFooter({
                text : `Requested by ${message.author.tag}`,
                iconURL : message.author.displayAvatarURL({
                    dynamic : true 
                })
            })

            await message.channel.send({embeds : [BannerEmbed]});
        
    }
};