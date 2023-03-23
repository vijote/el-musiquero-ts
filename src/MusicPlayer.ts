import BotClient from "./BotClient.js";
import { Player } from "discord-player";
import { PlayerQueue } from "./types.js";

class MusicPlayer extends Player {
    constructor(client: BotClient) {
        super(client, {
            ytdlOptions: {
                quality: "lowest",
                filter: "audioonly",
            }
        })
        this.setOnErrorHandler()
        this.setOnTrackStartHandler()
    }

    private setOnErrorHandler() {
        this.events.on('error', (_queue: PlayerQueue, error: Error) => {
            console.log('Hubo un error:', error);
        })
        this.events.on('playerError', (_queue, error, track) => {
            console.log('Hubo un error:', error, track);
        })
        this.events.on('debug', (_queue, message) => {
            console.log(message);
        })
    }

    private setOnTrackStartHandler() {
        this.events.on('playerStart', (queue: PlayerQueue, track) => {            
            return queue.metadata.channel.send(`Suena ahora: **${track.title}** | 🎶`)
        })
    }
}

export default MusicPlayer