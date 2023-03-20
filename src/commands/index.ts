import { Collection } from 'discord.js'
import ping from './ping.js'
import play from './play.js'

export default new Collection([
    ['ping', ping],
    ['play', play]
])