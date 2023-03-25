import { useMasterPlayer } from 'discord-player'
import { PlayerInteraction } from "../types.js"
import Command from "./Command.js"

export default new Command()
    .setName('play')
    .addStringOption(option => option
        .setName('query')
        .setDescription('url o texto a buscar en youtube')
        .setRequired(true))
    .setDescription('Reproduce una cancion de youtubue')
    .setInteractionHandler(async function (interaction: PlayerInteraction) {
        const player = useMasterPlayer() // Get the player instance that we created earlier
        const channel = interaction.member.voice.channel
        if (!channel) {
            await interaction.reply('You are not connected to a voice channel!') // make sure we have a voice channel
            return
        }
        const query = interaction.options.getString('query', true) // we need input/query to play
    
        // let's defer the interaction as things can take time to process
        await interaction.deferReply()
        const searchResult = await player.search(query, { requestedBy: interaction.user })
    
        if (!searchResult.hasTracks()) {
            // If player didn't find any songs for this query
            await interaction.editReply(`Wtf no encontre nada buscando: ${query}!`)
            return
        } else {
            try {
                await player.play(channel, searchResult, {
                    nodeOptions: {
                        leaveOnEnd: false,
                        metadata: interaction // we can access this metadata object using queue.metadata later on
                    }
                })
                await interaction.editReply(`Aber banca que busco 🔎: ${query}`)
            } catch (e) {
                // let's return error if something failed
                await interaction.followUp(`Uh wachin, se rompio todo: ${e}`)
                return
            }
        }
    })
