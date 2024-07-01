import { Collection } from 'discord.js'
import play from './play'
import skip from './skip'
import speed from './speed'
import fast_forward from './fast_forward'

export default new Collection([
    ['play', play],
    ['skip', skip],
    ['changespeed', speed],
    ['fastforward', fast_forward],
])