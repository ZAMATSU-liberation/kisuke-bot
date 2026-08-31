const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name : "nutkick",

    async execute(message , args ){
        const member = message.mentions.users.first();

        if(!member){
            return message.reply('mention the member first jew!! ')


        }

        const res = await axios.get('https://api.giphy.com/v1/gifs/search', // api calling 
            {
                params : {
                    api_key : process.env.GIPHY_API_KEY,
                    q : "balls kick",
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
            .setTitle(`${message.author.globalName} nutkicked ${member.globalName}`)
            .setImage(random.images.original.url)
            .setColor('#525ee2')
            .setTimestamp();

        message.channel.send({
            embeds : [embed]
        });
    }
};