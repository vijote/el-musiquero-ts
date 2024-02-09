import { Collection } from 'discord.js'
import play from './play'
import skip from './skip'
import speed from './speed'

export default new Collection([
    ['play', play],
    ['skip', skip],
    ['changespeed', speed],
])