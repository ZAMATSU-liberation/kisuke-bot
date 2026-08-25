const {
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp', 'dp'],
    description: "get user's avatar",

    async execute(message, args) {

        const member = message.mentions.users.first();

        if (!member) {
            return message.reply('user missing');
        }

        const avatarfetch = member.displayAvatarURL({
            dynamic: true,
            size: 512
        });

        const ServerAvatar = member?.avatar
            ? member.avatarURL({
                dynamic: true,
                size: 512
            })
            : null;

        const embed = new EmbedBuilder()
            .setTitle(`${member.username} Avatar`)
            .setColor(0x5865F2)
            .setFooter({
                text: `requested by ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true,
                    size: 16
                })
            })
            .setTimestamp();

        if (ServerAvatar) {

            const globalButton = new ButtonBuilder()
                .setCustomId('original_avatar')
                .setLabel('Original Avatar')
                .setStyle(ButtonStyle.Primary);

            const serverButton = new ButtonBuilder()
                .setCustomId('server_avatar')
                .setLabel('Server Avatar')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder()
                .addComponents(globalButton, serverButton);

            embed.setImage(ServerAvatar);

            await message.channel.send({
                embeds: [embed],
                components: [row]
            });

        } else {

            const globalButton = new ButtonBuilder()
                .setCustomId('original_avatar')
                .setLabel('Original Avatar')
                .setStyle(ButtonStyle.Primary);

            const row = new ActionRowBuilder()
                .addComponents(globalButton);

            embed.setImage(avatarfetch);

            await message.channel.send({
                embeds: [embed],
                components: [row]
            });
        }
    }
};