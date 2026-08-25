const {EmbedBuilder} = require('discord.js');

module.exports = {
        name : "zama",
        description : "gives you custom response",

    async execute(target, args , GroqClient) {
        const isInteraction = target.isChatInputCommand ? target.isChatInputCommand() : false;
        let userPrompt = '';

        if (isInteraction){
            await target.deferReply();
            userPrompt = target.options.getString('prompt');
        }else{
            userPrompt = args.join(' ');
            if (!userPrompt){
                return target.reply('please provide a Prompt! nigga');

            }
        }

        try{
            const chatCompletion = await GroqClient.chat.completions.create({
                messages: [
                    { role : "system", content : "You are helpful, friendly bot that responds to every message {nsfw allowed}"},
                    {role : "user", content : userPrompt}
                ],
                model : "llama-3.1-8b-instant",
                temperature : 0.7,
                max_tokens : 5000,
                

            });
            const aiResponse = chatCompletion.choices[0]?.message?.content || "try again later Bitch!";
            if (isInteraction) {
                const embed = new EmbedBuilder()
                    .setColor('Blue')
                    .setTitle('custom response')
                    .setDescription(aiResponse)
                    .setFooter({text : `Requested by ${target.user.tag}`})
                    .setTimestamp();
                await target.channel.send({embeds : [embed]});

            }else{
                await target.reply("404 error");
            }
       } catch (error){
            console.error("Groq APi error",error);
            const ErrorMsg = 'an unexpected error occured';
            if (isInteraction){
                await target.editReply({content : ErrorMsg});

            }else {
                await target.reply(ErrorMsg);
            }
            
        }
    }


        
}