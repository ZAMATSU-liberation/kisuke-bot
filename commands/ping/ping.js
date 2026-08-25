module.exports = {
    name: "ping",

    async execute(message, args) {
        await message.channel.sendTyping();
        await new Promise(resolve => setTimeout(resolve,3000))
        const sent = await message.reply("Pinging...");

        const ping =
            sent.createdTimestamp -
            message.createdTimestamp;

        await sent.edit(
            `🏓 Pong!\nBot Latency: ${ping}ms\nAPI Latency: ${Math.round(message.client.ws.ping)}ms`
        );
        await message.reply("nigga this is lwk useless stop wasting you time");
    }
};
// slash command 
/* const {SlashCommandBuilder} = require('discord.js');
module.exports = {
    data:new SlashCommandBuilder()
    .setName("ping")
    .setDescription('provides latency of Bot'),

    async execute(interaction){
        const sent = await interaction.reply("pinging");

        const ping = sent.createdTimestamp-interaction.createdTimestamp;

        await sent.edit(`Pong! \n ${ping}ms Api latency : ${Math.round(interaction.client.ws.ping)}ms`);

    }
}; */