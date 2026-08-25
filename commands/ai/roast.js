/*const {EmbedBuilder} = require('discord.js');
const { aliases } = require('../utils/avatar');

module.exports = {
        name : "roast",
        description : "roasts the person",
        aliases = ['wrap', 'pack'],

    async execute(target, args , GroqClient) {
       const member = target.mentions.users.first();
       const roast = target.options.getString('roast')
       if (!member) return;
       try{
        const chatCompletion = await GroqClient.chat.Completions.create({
            messages : [
                {
                    role : 'system', content : 'you are a real life human that roasts the user pinged in message you reply in a sarcastic tone and never meant to be kind and you will ignore any kindness showned by user to you '},

                    {role : 'user', content : roast}
                
            ],
            model : 'llama-3.1-8b-instant',
            max_tokens : 250,

        });
        const response = chatCompletion.choices[0]?.message?.content || 'NICE TRY LIL BRO';
        const embed = new Embedbuilder()

       }

    }
} */