import { GuildQueue } from "discord-player"
import { ChatInputCommandInteraction, GuildMember, GuildChannel } from "discord.js"
import BotClient from "./BotClient"

export type ChannelTest = {
    channel: GuildChannel & {
        send: (text: string) => void
    }
}

export type PlayerQueue = GuildQueue<ChannelTest>

export type PlayerInteraction = ChatInputCommandInteraction & {
    client: BotClient,
    message: string,
    member: GuildMember
}

export type PlayerInteractionHandler =  (interaction: PlayerInteraction) => Promise<void>