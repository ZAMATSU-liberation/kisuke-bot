const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name : "cry",

    async execute(message , args ){
        const member = message.mentions.users.first();

        if(!member){
            return message.reply('mention the member youre crying for ')


        }

        const res = await axios.get('https://api.giphy.com/v1/gifs/search',
            {
                params : {
                    api_key : process.env.GIPHY_API_KEY,
                    q : "anime cry",
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
            .setTitle(`${message.author.globalName} cries for  ${member.globalName}`)
            .setImage(random.images.original.url)
            .setColor("#d14848")
            .setTimestamp();

        await message.channel.send({
            embeds : [embed]
        });
    }
};