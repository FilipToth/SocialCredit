import { Command, Config } from "../../Interfaces";

export const command: Command = {
    name: 'toggledebug',
    aliases: ['td', 'debug'],
    run: async(client, message, args) => {
        if (process.env.DEBUG == "true") {
            process.env.DEBUG = "false";
        } else {
            process.env.DEBUG = "true";
        }

        message.channel.send("Setting debug mode to: `" + process.env.DEBUG + "`");
    }
};