const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name : "flirt",

    async execute(message , args ){
        const member = message.mentions.users.first();

        if(!member){
            return message.reply('pls mention a member to flirt with uwu..')


        }
        const res = await axios.get('https://api.giphy.com/v1/gifs/search',
                    {
                        params : {
                            api_key : process.env.GIPHY_API_KEY,
                            q : "anime flirt",
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
                .setTitle(`${message.author.globalName || message.author.username} flirts with ${member.globalName || member.username} uwu..`)
                .setImage(random.images.original.url)
                .setColor('#f0c2e4')
                .setTimestamp();

            await message.channel.send({
            embeds : [embed]
        });
    }
};