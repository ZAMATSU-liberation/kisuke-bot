const {EmbedBuilder} = require("discord.js");
const fs = require("fs");
module.exports = {
    name : 'anl',
    async execute(message,args){
        const member = message.mentions.members.first();
        if (!member) return 
        const links = fs
            .readFileSync("./assets/gifs.txt", 'utf8')
            .split('\n')
            .map(link => link.trim().replace(/^["']|["']$/g, ""))
            .filter(Boolean);

        const randomlinks = links[Math.floor(Math.random()* links.length)];

        const axios = require("axios");
        const cheerio = require("cheerio");

        async function getGifUrl(pageUrl) {
            const { data: html } = await axios.get(pageUrl);
            const $ = cheerio.load(html);

            const gifUrl = $("meta[property='og:image']").attr("content");

            return gifUrl;
        }

        const url = await getGifUrl(randomlinks);

        console.log(url);
    
        const embed = new EmbedBuilder()
        .setTitle(`${message.author.globalName } anal fuck ${member.globalName}`)
        .setImage(url)
        .setColor('Random')
        .setFooter({text : 'requested by pyran'})
        .setTimestamp();

        if(message.channel.nsfw){
            message.channel.send({embeds : [embed]});
        }else{
            console.log('/_/_/_/_/_\ non nsfw channel! request terminated');
            message.channel.send('terminated request : cant send nsfw stuff in sfw channel');
        }
    }
}