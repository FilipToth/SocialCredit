import Client from './Client';
import { Intents } from 'discord.js';

const client = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.GUILDS]});
client.init();