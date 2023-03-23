import { Channel } from "diagnostics_channel"
import { GuildQueue } from "discord-player"
import { ChatInputCommandInteraction, GuildMember } from "discord.js"
import BotClient from "./BotClient.js"

export type PlayerQueue = GuildQueue & {
    metadata: {
        channel: Channel & {
            send: (text: string) => void
        }
    }
}

export type PlayerInteraction = ChatInputCommandInteraction & {
    client: BotClient,
    message: string,
    member: GuildMember
}

export type PlayerInteractionHandler =  (interaction: PlayerInteraction) => Promise<void>