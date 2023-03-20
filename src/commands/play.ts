import Command from "./Command.js";

export default new Command()
    .setName('play')
    .addStringOption(option => option
        .setName('query')
        .setDescription('url o texto a buscar en youtube')
        .setRequired(true))
    .setDescription('Reproduce una cancion de youtubue')
    .setInteractionHandler((_musicPlayer) => async (interaction) => {
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "Flaco, metete a un canal primero", ephemeral: true });
        
        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) return await interaction.reply({ content: "No estas en mi canal maestro", ephemeral: true });

        const query = interaction.options.getString("query");

        console.log('Se solicita reproducir:', query);

        const queue = interaction.client.player.createQueue(interaction.guild, {
            leaveOnEnd: false,
            leaveOnStop: false,
            leaveOnEmpty: false,
            ytdlOptions: {
                quality: "highest",
                filter: "audioonly",
                highWaterMark: 1 << 25,
                dlChunkSize: 0,
            },
            metadata: {
                channel: interaction.channel
            }
        });

        // verify voice channel connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "No pude entrar a tu canal rey, disculpa", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await interaction.client.player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Que puta pediste? No encontre nada con **${query}**` });

        queue.play(track);

        return await interaction.followUp({ content: `⏱️ | Bancame mientras cargo: **${track.title}**` });
    })