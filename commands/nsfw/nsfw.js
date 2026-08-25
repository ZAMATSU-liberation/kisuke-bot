const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

// nekobot.xyz nsfw types
const types = [
  'boobs', 'hboobs', 'hentai', 'ass', 'hass', 'pussy',
  'thigh', 'hthigh', 'hmidriff', 'pgif', '4k', 'hneko',
  'hkitsune', 'kemonomimi', 'anal', 'hanal', 'paizuri',
  'tentacle', 'yaoi', 'yuri', 'futa', 'lewdkemo',
  'lewdk', 'kanna', 'gah', 'coffee', 'food'
];

module.exports = {
  name: 'nsfw',
  execute: async (message, args, groq, db) => {
    if (!message.channel.nsfw) {
      return message.reply('this command only works in nsfw channels');
    }

    // if user passes a type, use it; otherwise random
    let type = args[0]?.toLowerCase();
    if (type && !types.includes(type)) {
      return message.reply(`invalid type. available: ${types.join(', ')}`);
    }
    if (!type) type = types[Math.floor(Math.random() * types.length)];

    try {
      const res = await axios.get(`https://nekobot.xyz/api/image?type=${type}`, {
        headers: { 'User-Agent': 'PyranBot/1.0' },
        timeout: 8000,
      });

      const data = res.data;
      if (!data.success || !data.message) {
        return message.reply('api returned empty response');
      }

      const embed = new EmbedBuilder()
        .setTitle(type)
        .setImage(data.message)
        .setColor('#ef13cb')
        .setFooter({ text: 'nekobot.xyz • developed by pyran' })
        .setTimestamp();

      message.channel.send({ embeds: [embed] });

    } catch (err) {
      console.error('error:', err.response?.status, err.message);
      message.reply('failed to fetch image — api might be down or blocked');
    }
  },
};