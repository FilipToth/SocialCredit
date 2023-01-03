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
                { name: 'command: toggledebug (aliases: debug, td)', value: `Toggles debug mode.`},
                { name: 'command: leaderboard (aliases: ld)', value: `Shows the global social credit score leaderboard.`}
            )
            .setFooter('For more information about bot commands, contact your local party official!');

        message.channel.send({embeds: [mbed]});
    }
};