const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

const boorus = [
  {
    name: 'yande.re',
    url: (tags) => `https://yande.re/post.json?limit=100&tags=${encodeURIComponent(tags)}`,
    parse: (d) => {
      if (!Array.isArray(d) || !d.length) return null;
      const post = d[Math.floor(Math.random() * d.length)];
      return post.file_url || post.sample_url;
    },
  },
  {
    name: 'konachan',
    url: (tags) => `https://konachan.com/post.json?limit=100&tags=${encodeURIComponent(tags)}`,
    parse: (d) => {
      if (!Array.isArray(d) || !d.length) return null;
      const post = d[Math.floor(Math.random() * d.length)];
      return post.file_url || post.sample_url;
    },
  },
  {
    name: 'rule34',
    url: (tags) => `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&limit=100&tags=${encodeURIComponent(tags)}`,
    parse: (d) => {
      let posts = d;
      if (d && Array.isArray(d.post)) posts = d.post;
      else if (!Array.isArray(d)) return null;
      if (!posts.length) return null;
      const post = posts[Math.floor(Math.random() * posts.length)];
      return post.file_url || post.sample_url;
    },
  },
];

module.exports = {
  name: 'boob',
  execute: async (message, args, groq, db) => {
    if (!message.channel.nsfw) {
      return message.reply('this command only works in nsfw channels');
    }

    const tags = args.length ? args.join(' ').toLowerCase() : 'breasts';
    let lastErr = null;

    for (const booru of boorus) {
      try {
        const res = await axios.get(booru.url(tags), {
          headers: { 'User-Agent': 'PyranBot/1.0' },
          timeout: 10000,
        });

        const imgUrl = booru.parse(res.data);
        if (!imgUrl) {
          console.log(`boob: no results from ${booru.name} for "${tags}"`);
          continue;
        }

        const embed = new EmbedBuilder()
          .setTitle(tags)
          .setImage(imgUrl)
          .setColor('#ef13cb')
          .setFooter({ text: `${booru.name} • developed by pyran` })
          .setTimestamp();

        return message.channel.send({ embeds: [embed] });

      } catch (err) {
        lastErr = err;
        console.log(`boob: ${booru.name} failed —`, err.message);
      }
    }

    console.error('boob: all boorus failed. last:', lastErr?.message);
    message.reply('all image sources failed — api might be blocked on your network');
  },
};