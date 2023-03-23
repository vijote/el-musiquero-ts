import { SlashCommandBuilder } from 'discord.js';
import { PlayerInteractionHandler } from '../types.js';

class Command extends SlashCommandBuilder {
    public execute!: PlayerInteractionHandler;

    setInteractionHandler(interactionHandler: PlayerInteractionHandler) {
        this.execute = interactionHandler

        return this
    }
}

export default Command