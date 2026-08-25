const {EmbedBuilder,PermissionFlagsBits} = require('discord.js');
module.exports = {
    name : 'addrole',
    description : 'adds role to the member mentioned',
    async execute(message,args){
        await message.channel.sendTyping();
        await new Promise(resolve => setTimeout(resolve, 3000));
        let member = message.mentions.members.first();
        if (!member) return message.reply('missing target user');
        if (!message.member.permissions.has(PermissionFlagsBits.ManageRoles)){
            return message.channel.send({text : 'missing required perms'});

        }
        const role = 
            message.mentions.role.first() ||
            message.guild.roles.cache.get(args[1]);

        if (!role){
            return message.reply(
                'mention a role'
            );
        }
        if (role.position >= message.guild.members.me.roles.highest.position){
            return message.reply('role hierarchy is higher');
        }
        if (member.roles.cache.has(role.id)){
            return message.reply('member already have this role');
        }

        try {
            message.roles.add(role);

            const embed = new EmbedBuilder()
                .setTitle(`${role.name} assigned to ${member.username.tag} `)
                .setColor("Random")
                .setFooter({
                    text : `${message.author}`,
                    iconURL : message.author.displayAvatarURL({
                        dynamic : true
                    })
                })
            await message.channel.send({embeds : [embed]});
        }catch(error){
            console.error(error);
            message.channel.send('i couldnt add roles to this member')


        }
    }

    

}