import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import MusicPlayer from '../MusicPlayer.js';

type InteractionHandler =  (interaction: CommandInteraction) => void
type MusicInteractionHandler = (player: MusicPlayer | null) => InteractionHandler

class Command extends SlashCommandBuilder {
    public execute!: InteractionHandler;
    private _player!: MusicPlayer | null;

    setPlayer(player: MusicPlayer) {
        this._player = player
    }

    setInteractionHandler(interactionHandler: MusicInteractionHandler) {
        this.execute = interactionHandler(this._player)

        return this
    }
}

export default Command