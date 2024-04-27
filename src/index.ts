import * as dotenv from 'dotenv'
import BotClient from "./BotClient"
import commands from "./commands/index"
import MusicPlayer from './MusicPlayer'

dotenv.config()

async function initializeClient() {
    const {TOKEN, GUILD_ID, CLIENT_ID} = process.env
    if(!TOKEN || !GUILD_ID || !CLIENT_ID) throw new Error("Environment variables not set!")

    const client = new BotClient(TOKEN, CLIENT_ID, GUILD_ID)
    const player = new MusicPlayer(client)
    client.setCommands(commands)
    await client.refreshCommands()
    client.logIn()
}

initializeClient()
