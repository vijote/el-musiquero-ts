import { Client, GatewayIntentBits, Events, REST, Routes, Collection, Interaction } from 'discord.js';
import { AudioFilters } from "discord-player";
import Command from './commands/Command';
import { PlayerInteraction } from './types';

class BotClient extends Client {
    private clientId: string
    private guildId: string
    public commands!: Collection<string, Command>;

    // Underscore to avoid conflicts with the existing token property in the Client class
    private _token: string;

    constructor(token: string, clientId: string, guildId: string) {
        super({
            intents: [
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.Guilds
            ]
        })

        this._token = token
        this.clientId = clientId
        this.guildId = guildId

        this.setOnClientReadyHandler()
        this.setInteractionHandler()
        this.setAudioFilters()
    }

    private setOnClientReadyHandler() {
        
        this.once(Events.ClientReady, client => {
            console.log(`${client.user.tag} ya esta listo para esos rolones 👾`)
        });
    }

    private setAudioFilters() {
        AudioFilters.define("speed1", "atempo=1")
        AudioFilters.define("speed1.25", "atempo=1.25")
        AudioFilters.define("speed1.5", "atempo=1.5")
        AudioFilters.define("speed1.75", "atempo=1.75")
        AudioFilters.define("speed2", "atempo=2")
    }

    logIn() {
        return this.login(this._token)
    }

    setCommands(commands: Collection<string, Command>) {
        this.commands = commands
    }

    async refreshCommands() {
        try {
            const rest = new REST({ version: '10' }).setToken(this._token);
            const clientCommands = this.commands.map((command) => {
                return command
            })

            console.log(`Comenzando a refrescar commandos slash 🔎`);
            
            // The PUT method is used to fully refresh all commands in the guild with the current set
            await rest.put(
                Routes.applicationGuildCommands(this.clientId, this.guildId),
                { body: clientCommands },
            );
    
            console.log(`se refrescaron ${clientCommands.length} commandos slash 👌`);
        } catch (error) {
            console.log('error al refrescar:');
            
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    }

    setInteractionHandler() {
        this.on(Events.InteractionCreate, async (interaction: Interaction) => {
            if (!interaction.isChatInputCommand()) return;
            
            const command = this.commands.get(interaction.commandName);
        
            if (!command) {
                console.error(`Wtf amigo el comando: ${interaction.commandName} no existe`);
                return;
            }
        
            try {
                await command.execute(interaction as PlayerInteraction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Exploto todo mientras hacia lo que me pediste', ephemeral: true });
            }
        });
    }
}

export default BotClient
