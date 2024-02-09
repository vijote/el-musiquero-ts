import BotClient from "./BotClient";
import { GuildQueue, Player } from "discord-player";
import { ChannelTest, PlayerQueue } from "./types";

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
        this.setOnTrackEndHandler()
    }

    private setOnErrorHandler() {
        this.events.on('error', (_queue: GuildQueue, error: Error) => {
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
        /*
        Argument of type '(queue: PlayerQueue, track: Track) => void' is not assignable to parameter of type '(queue: GuildQueue<unknown>, track: Track) => unknown'.
            Types of parameters 'queue' and 'queue' are incompatible.
                Type 'GuildQueue<unknown>' is not assignable to type 'PlayerQueue'.
                Type 'GuildQueue<unknown>' is not assignable to type '{ metadata: { channel: Channel & { send: (text: string) => void; }; }; }'.
                    Types of property 'metadata' are incompatible.
                    Type 'unknown' is not assignable to type '{ channel: Channel & { send: (text: string) => void; }; }'.ts(2345)
          */
        this.events.on('playerStart', (queue: GuildQueue, track) => {
            return (queue as PlayerQueue).metadata.channel.send(`Suena ahora: **${track.title}** | 🎶`)
        })
    }

    private setOnTrackEndHandler() {
        this.events.on('playerFinish', (queue: GuildQueue, track) => {            
            // queue.filters.ffmpeg.toggle("speed1")
        })
    }

    private setPlayerSkipHandler() {
        this.events.on('playerSkip', (queue: GuildQueue, track) => {
            (queue as PlayerQueue).metadata.channel.send(`Salteando **${track.title}** porque esta re turbio`);
        });
    }

    private setEmptyQueueHandler() {
        this.events.on('emptyQueue', (queue: GuildQueue) => {
            (queue as PlayerQueue).metadata.channel.send(`No hay mas canciones para reproducir`);
        });
    }
}

export default MusicPlayer