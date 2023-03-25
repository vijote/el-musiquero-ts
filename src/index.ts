import * as dotenv from 'dotenv'
import BotClient from "./BotClient.js"
import commands from "./commands/index.js"
import MusicPlayer from './MusicPlayer.js'

dotenv.config()

async function initializeClient() {
    const {TOKEN, GUILD_ID, CLIENT_ID} = process.env    

    const client = new BotClient(TOKEN, CLIENT_ID, GUILD_ID)
    const player = new MusicPlayer(client)
    client.setCommands(commands)
    await client.refreshCommands()
    client.logIn()
}

initializeClient()