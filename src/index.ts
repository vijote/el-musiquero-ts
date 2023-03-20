import * as dotenv from 'dotenv'
import BotClient from "./BotClient.js"
import commands from "./commands/index.js"

dotenv.config()

async function initializeClient() {
    const {token, guildId, clientId} = process.env

    const client = new BotClient(token, clientId, guildId)

    client.setCommands(commands)
    await client.refreshCommands()
    client.logIn()
}

initializeClient()