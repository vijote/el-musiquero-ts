import BotClient from "BotClient.js";

import { Player, Queue } from "discord-player";

class MusicPlayer extends Player {
    constructor(client: BotClient) {
        super(client)
        this.setOnErrorHandler()
        this.setOnTrackStartHandler()
    }

    private setOnErrorHandler() {
        this.on('error', (queue: Queue<unknown>, error: Error) => {
            console.log('Hubo un error:', error);
        })
    }

    private setOnTrackStartHandler() {        
        this.on("trackStart", (queue: Queue<unknown>, error: Error) => {
            console.log(queue);
            
            return queue.metadata.channel.send(`Suena ahora: **xxx** | 🎶`)
        })
    }
}

export default MusicPlayer