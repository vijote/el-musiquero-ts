import { useQueue } from 'discord-player'
import { PlayerInteraction } from "../types"
import Command from "./Command"

export default new Command()
    .setName('fastforward')
    .addNumberOption(option => option
        .setName('duration')
        .setDescription('segundo al que adelantar')
        .setRequired(true))
    .setDescription('Adelanta al segundo indicado en la cancion')
    .setInteractionHandler(async function (interaction: PlayerInteraction) {
        if (!interaction.guild) throw new Error("Guild not set!")

        const queue = useQueue(interaction.guild.id);

        if (!queue) throw new Error("Queue not set!");

        const duration = interaction.options.getNumber("duration");

        if (duration === null) throw new Error("Duration not set!");

        // let's defer the interaction as things can take time to process
        await interaction.deferReply();


        try {
            await interaction.editReply("Ahi adelanto rey, banca");
            await queue.node.seek(duration * 1000);
            await interaction.followUp(`Adelantando al segundo ${duration}`);
            return;
        } catch (error) {
            await interaction.followUp('Se rompio todo mientras adelantaba');
        };
    })
