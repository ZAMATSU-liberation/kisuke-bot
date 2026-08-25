const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name : 'hug',

    async execute(message,args){
        const member = message.mentions.users.first();

        if (!member){
            return message.reply('mention a user first to hug');
        }

        const res = await axios.get("https://api.giphy.com/v1/gifs/search",
            {
                params : {
                    api_key : process.env.GIPHY_API_KEY,
                    q : "anime hug",
                    limit : 25,
                    rating : "pg-13"
                }
            }
        );

        const gifs = res.data.data;
        if (!gifs.length){
            return message.reply("no gifs found");
            }
            const random = gifs[Math.floor(Math.random()*gifs.length)];
        
        
        
        
        
        const embed = new EmbedBuilder()
            .setTitle(`${message.autho.globalName} hugs ${member.globalName} gently.. >_<`)
            .setImage(random.images.original.url)
            .setColor('#FF69B4')
            .setFooter({text : "Powered by giphy"})
            .setTimestamp();

        await message.channel.send({
             embeds : [embed]
        });
        
    }
};