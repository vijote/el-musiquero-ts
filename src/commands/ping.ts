import Command from './Command';

export default new Command()
    .setName('ping')
    .setDescription('Replies with Pong!')
    .setInteractionHandler(async interaction => {
        await interaction.reply('Pong!')
    })