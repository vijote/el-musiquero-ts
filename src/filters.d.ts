import { QueueFilters, AudioFilters } from 'discord-player'

declare module 'discord-player' {
    interface QueueFilters {
        speed1?: boolean
        "speed1.25"?: boolean
        "speed1.5"?: boolean
        "speed1.75"?: boolean
        speed2?: boolean
    }
}