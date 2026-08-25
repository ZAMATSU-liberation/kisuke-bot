module.exports = {
  name: 'afk',
  execute: async (message, args,groq,db) => {
    const reason = args.join(' ') || 'AFK';
    db.setAfk(message.author.id, message.guild.id, reason);

    const { EmbedBuilder } = require('discord.js');
    const embed = new EmbedBuilder()
      .setTitle('afk set')
      .setDescription(`you are now afk: **${reason}**`)
      .setColor('#a5ef10')
      .setTimestamp();

    message.reply({ embeds: [embed] });
  }
};