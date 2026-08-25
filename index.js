require('dotenv').config();
const Groq = require('groq-sdk')
const prefix = "!";
const groq = new Groq({
    apiKey : process.env.api_key
});
const {EmbedBuilder} = require('discord.js');
const axios = require('axios');
// for slash commands ================================================================================================
/* const {SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord.js");
const {REST,Routes} = require('discord.js');
const fs = require('fs');
const path = require("path"); */
const db = require('./commands/config/database'); // calling the afk presets from file to index
// slash commands registration..-------------------------------------------------------------->
/*const commands = [];
const fol = fs.readdirSync("./commands");
for (folder of fol){
    const fil = fs.readdirSync(`/commands/${folder}`).filter(f=> f.endsWith("js"));

    for (file of fil){
        const command = fs.readdirSync(`/commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}
const rest = new REST({version:"10"})
    .setToken(process.env.BOT_TOKEN);
(async() =>{
    await rest.put()
}); */

const {
    Client,     
    GatewayIntentBits,
    Partials,
    Collection,
    ActivityType,
    PresenceUpdateStatus,
    Events,
} = require('discord.js');

const client = new Client({
    intents : [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials :[
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember
    ]
});

// calling database 

// set prefix for commands
client.on('messageCreate', async(message) =>{
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);
    if (!command) return;
    try {
    db.logCommand(message.author.id , commandName, args,message.guild?.id);
    await command.execute(message,args,groq,db);
    }catch(error){
    console.error(error);
    message.reply('there was an error executing this command');
    }
}); // prefix setting
// look up in commands folder 
client.commands = new Collection();
const fs = require('fs');
const path = require('path');
const { MessageCollector } = require('discord.js');
const afk = require('./commands/ping/afk');
const { convertProcessSignalToExitCode } = require('util');
const Commandpath = path.join(__dirname, 'commands');

 // ============================ bot ready==================================================   

client.once(Events.ClientReady, async () =>{
    console.log(`the bot is online and logged in as ${client.user.tag}`);


    // deploy command(slash ones)------------------------------------------------------->

/*client.on('interactionCreate',async interaction =>{
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command){
    try{
        await command.execute(interaction); 
    }catch(error){
        console.error('error');

        if (interaction.replied || interaction.deffered){
            await interaction.followUp({
                content : "something went wrong!",
                ephemeral : true
            });

        }
        
    }
    }
}); */
       


const statustype = process.env.BOT_STATUS;
const activitytype = process.env.ACTIVITY_TYPE;
const activityname = process.env.ACTIVITY_NAME;

const activityTypeMap = {
    'PLAYING': ActivityType.Playing,
    'WATCHING': ActivityType.Watching,
    'LISTENING' : ActivityType.Listening,
    'STREAMING': ActivityType.Streaming,
    'COMPETING' : ActivityType.Competing
};

const StatusMap = {
    'online': PresenceUpdateStatus.Online,
    'idle' : PresenceUpdateStatus.Idle,
    'dnd' : PresenceUpdateStatus.DoNotDisturb,
    'invisible': PresenceUpdateStatus.Invisible
};

client.user.setPresence({
    status : StatusMap[statustype],
    activities : [{
        name : activityname,
        type : activityTypeMap[activitytype]
    }]
});

console.log(`bot status set to : ${statustype}`);
console.log(`activity set to : ${activitytype} ${activityname}`);

});
// ==========================================================================================================================

// to read the seperate folders under commands folder 
const commandFolders = fs.readdirSync(Commandpath);

for (const folder of commandFolders) {
    const folderPath = path.join(Commandpath, folder);

    if (!fs.statSync(folderPath).isDirectory()) continue;

    const commandFiles = fs.readdirSync(folderPath)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(path.join(folderPath, file));

        if (command.name && command.execute) {
            client.commands.set(command.name, command);
        } else {
            console.log(`${file} is missing name or execute`);
        }
    }
}

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().includes("fatima")) {
        message.reply("Wa Alaikum Assalam!");
    }
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().includes("scoobydoo")) {
        const res = await axios.get('https://api.giphy.com/v1/gifs/search',
                    {
                        params : {
                            api_key : process.env.GIPHY_API_KEY,
                            q : "middle finger",
                            limit : 25,
                            rating : "pg-13"
                        }
                    }
                );
                const gifs = res.data.data;
                if (!gifs.length){
                    return message.reply("no gifs found");
                } 
                const random = gifs[Math.floor(Math.random()*gifs.length)];
        const embed = new EmbedBuilder()
        .setTitle(" second hand chinese")
        .setImage(random.images.original.url)
        .setColor('#ef13cb')
        .setFooter({text: "developed by pyran"})
        message.channel.send({
            embeds : [embed]
        });
    }
    

});
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().includes("walty")) {
        const res = await axios.get('https://api.giphy.com/v1/gifs/search',
                    {
                        params : {
                            api_key : process.env.GIPHY_API_KEY,
                            q : "aura",
                            limit : 25,
                            rating : "pg-13"
                        }
                    }
                );
                const gifs = res.data.data;
                if (!gifs.length){
                    return message.reply("no gifs found");
                } 
                const random = gifs[Math.floor(Math.random()*gifs.length)];
        const embed = new EmbedBuilder()
        .setTitle("pakisthani deshbakht")
        .setImage(random.images.original.url)
        .setColor('#ef13cb')
        .setFooter({text: "developed by pyran"})
        message.channel.send({
            embeds : [embed]
        });
    }
    

});
// afk set and delete mechanism 
client.on('messageCreate', async (message) =>{
    if(message.author.bot || !message.guild) return

    if(db.isAfk(message.author.id, message.guild.id) && (!message.content.toLowerCase().startsWith(prefix + 'afk'))) {
        const data = db.getAfk(message.author.id,message.guild.id);
        db.removeAfk(message.author.id,message.guild.id);
        const time = Math.floor((Date.now()- Date.timestamp)/60000);
        const timesend = time <1? 'just now' : `${time}m ago`;

        const embed = new EmbedBuilder()
        .setTitle(`${message.author} welcome back, you left on afk ${timesend}`)
        .setTimestamp()

        message.channel.send({
            embeds : [embed]
        });
    }
        
    const mentionAfkusers = message.mentions.users.filter(y => y.id !== message.author.id && db.isAfk(y.id, message.guild.id));
        
    if (mentionAfkusers.size === 0) return;
    let replycount = 0;
    for (const [UserID,user] of mentionAfkusers){
        if(replycount >= 3) break;

        const data = db.getAfk(message.user.id,message.guild.id);
        if(!data) continue; // after the break of loop it re iterate the afk command

        db.bumpMentions(message.user.id,message.guild.id);

        const time = Math.floor((Date.now()-Date.timestamp)/60000);
        const timesend = time<1 ? 'just now': `${time}m ago`

        const embed = new EmbedBuilder()
        .setTitle(`${user.username} is currently on afk : ${data.reason}`)
        .setColor('#a5ef10')

        await message.channel.send({
            embeds : [embed]
        });
        replycount++;
    }
});

// interaction listener
client.on('interactionCreate', async interaction =>{
    if (!interaction.isButton()) return;
    const [action , userID] = interaction.customId.split('_');
    const user = await client.users.fetch(userID);
    if (action === 'original' && type === 'avatar'){ // displays the server specific avatar if exists
        const avatarURL = user.displayAvatarURL({
            dynamic : true,
            size : 1024
        });


        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Avatar`)
            .setImage(avatar)
            .setColor('Random');

        await interaction.update({embeds : [embed]});

    }
    if(action === 'Server' && type === 'avatar'){
        if (!user.avatar){
            return interaction.reply({text : "this user does'nt have Server Avatar" , ephemeral : true}); // sends an message that only visibles
        }
        const ServerAvatar = user.avatarURL({
            dynamic : true

        })
    }
});


// check if mute expired or not

setInterval(async()=>{  
    const now = Date.now();
    const activeMutes =  db.getActiveMutes();
    for (const mute of activeMutes){
        if (mute.expires_at , mute.expires_at <= now){
            db.unmuteDb(mute.user_id, mute.guild_id);
        }
    }
}, 60000);


client.login(process.env.BOT_TOKEN);