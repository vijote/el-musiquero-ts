import { AudioFilters, QueueFilters, useQueue } from 'discord-player'
import { PlayerInteraction } from "../types"
import Command from "./Command"

export default new Command()
    .setName('changespeed')
    .addStringOption(option => option
        .setName('speed')
        .addChoices(
            { name: '1.25', value: '1.25' },
            { name: '1.5', value: '1.5' },
            { name: '1.75', value: '1.75' },
            { name: '2', value: '2' },
        )
        .setDescription('url o texto a buscar en youtube')
        .setRequired(true))
    .setDescription('Sube la velocidad')
    .setInteractionHandler(async function (interaction: PlayerInteraction) {
        if(!interaction.guild) throw new Error("Guild not set!")

        const queue = useQueue(interaction.guild.id);

        if(!queue) throw new Error("Queue not set!")

        const speed = interaction.options.getString("speed")!

        queue.filters.ffmpeg.toggle(`speed${speed}` as keyof QueueFilters);
    })
