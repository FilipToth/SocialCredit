import { Command, Config } from "../../Interfaces";
import ConfigJson from "../../config.json";

export const command: Command = {
    name: 'toggledebug',
    aliases: ['td', 'debug'],
    run: async(client, message, args) => {
        const config: Config = ConfigJson;
        if (config.debug) {
            config.debug = false;
        } else {
            config.debug = true;
        }

        message.channel.send("Setting debug mode to: `" + config.debug + "`");
    }
};