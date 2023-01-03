import Client from './Client';
import { Intents } from 'discord.js';
import * as dotenv from 'dotenv'

// initialize dotenv
dotenv.config();
console.log(process.env);

const client = new Client({
    intents: [
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.MESSAGE_CONTENT
    ]
});

client.init();