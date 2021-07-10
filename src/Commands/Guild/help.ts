import { Command, Config } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'help',
    aliases: ['hp'],
    run: async(client, message, args) => {
        const mbed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Help")
            .addFields(
                { name: 'command: help (aliases: hp)', value: `Shows this help.`},
                { name: 'command: credit (aliases: c)', value: `Displays your current social credit score.`},
                { name: 'command: ping (aliases: p)', value: `Pings the bot.`},
                { name: 'command: toggledebug (aliases: debug, td, d)', value: `Toggles debug mode.`},
            )
            .setFooter('For more information about bot commands,  go f urself, cause the government dont care!');;

        message.channel.send(mbed);
    }
};