const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  name: 'neko',
  execute: async (message, args, groq, db) => {
    try {
      const res = await axios.get('https://nekos.best/api/v2/neko', {
        headers: {
          'User-Agent': 'PyranBot/1.0 (discord)'
        },
        timeout: 5000
      });

      const data = res.data.results[0];

      const embed = new EmbedBuilder()
        .setTitle('neko')
        .setImage(data.url)
        .setColor('#ef13cb')
        .setFooter({ text: `artist: ${data.artist_name || 'unknown'}` })
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      console.error('neko error:', err.response?.status, err.response?.data || err.message);
      message.reply('failed to fetch neko image — api might be down');
    }
  }
};