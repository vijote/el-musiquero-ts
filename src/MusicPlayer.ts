import BotClient from "./BotClient.js";
import { Player } from "discord-player";
import { PlayerQueue } from "./types.js";

class MusicPlayer extends Player {
    constructor(client: BotClient) {
        super(client, {
            ytdlOptions: {
                quality: "highest",
                filter: "audioonly",
                highWaterMark: 1 << 25,
                dlChunkSize: 0
            }
        })
        this.setOnErrorHandler()
        this.setOnTrackStartHandler()
        this.setEmptyQueueHandler()
        this.setPlayerSkipHandler()
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

    private setPlayerSkipHandler() {
        this.events.on('playerSkip', (queue: PlayerQueue, track) => {
            queue.metadata.channel.send(`Salteando **${track.title}** porque esta re turbio`);
        });
    }

    private setEmptyQueueHandler() {
        this.events.on('emptyQueue', (queue: PlayerQueue) => {
            queue.metadata.channel.send(`No hay mas canciones para reproducir`);
        });
    }
}

export default MusicPlayer