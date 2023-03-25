import { Collection } from 'discord.js'
import play from './play.js'
import skip from './skip.js'

export default new Collection([
    ['play', play],
    ['skip', skip],
])