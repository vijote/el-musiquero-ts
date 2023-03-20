import Command from './Command.js';

export default new Command()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .setInteractionHandler((_musicPlayer) => async interaction => {        
        await interaction.reply('Pong!')
    })