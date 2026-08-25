const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const {PermissionFlagsBits} = require('discord.js');

module.exports = {
    name : 'roles',
    async execute(message, args) {

        if (!message.member.permissions.has(PermissionFlagsBits.SendMessages)) {
            return message.send('you dont have permission');
        }

        const roleplayPath = path.join(__dirname, '../roleplay');

        const commands = fs.readdirSync(roleplayPath)
            .filter(file => file.endsWith('.js'))
            .map(file => file.replace('.js', ''));

        const commandList = commands
            .map(command => `\`!${command} @user\``)
            .join('\n');

        const embed = new EmbedBuilder()
            .setTitle('🎭 Fun / Roleplay Commands')
            .setDescription(commandList)
            .setFooter({
                text: `${commands.length} commands`
            });

        return message.channel.send({
            embeds: [embed]
        });
    }
};