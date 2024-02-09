import Command from './Command';
import { useQueue } from 'discord-player'

export default new Command()
    .setName('skip')
    .setDescription('Salta una cancion')
    .setInteractionHandler(async interaction => {
        if(!interaction.guild) throw new Error("Guild not set!")
        
        const queue = useQueue(interaction.guild.id);
        if(queue && queue.currentTrack) {
            queue.node.skip()
            await interaction.reply(`Salteando cancion: **${queue.currentTrack.title}**`)
            return
        }
        
        await interaction.reply(`Flaco que queres saltear si no estoy reproduciendo nada???`)
        return
    })