const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { addWarn, getWarnings } = require("../config/database");

module.exports = {
    name: "warn",
    description: "warns the member",

    async execute(message, args) {

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("Mention a user to warn.");
        }

        if (!message.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return message.reply("Missing Moderate Members permission.");
        }

        if (!message.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            const embed1 = new EmbedBuilder()
                .setTitle("I don't have Moderate Members permission")
                .setColor("#515de1")
                .setFooter({ text: "byhrinder" });

            return message.channel.send({
                embeds: [embed1]
            });
        }

        const reason = args.slice(1).join(" ") || "No reason given";

        // Save warning to SQLite
        addWarn(
            member.id,
            message.guild.id,
            message.author.id,
            reason
        );

        // Get all warnings for this user in this server
        const warnings = getWarnings(
            member.id,
            message.guild.id
        );

        const embed = new EmbedBuilder()
            .setTitle(`${member.displayName} has been warned successfully!`)
            .setDescription(`**Reason:** ${reason}`)
            .setColor("#f9ec04")
            .setFooter({
                text: `Warnings: ${warnings.length}`
            })
            .setTimestamp();

        await message.channel.send({
            embeds: [embed]
        });
        try {
            await message.user.send({embeds : [embed]})
            message.channel.send({text : "successfully sent warning in dm", ephemeral : true })
        }catch(error){
            console.error(error);
            message.channel.send({text : "couldnt send warning in dm", ephemeral : true })
        }
    }

};