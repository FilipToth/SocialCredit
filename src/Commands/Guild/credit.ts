import { Command, Config } from "../../Interfaces";
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'credit',
    aliases: ['c'],
    run: async(client, message, args) => {
        const mbed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Social Credit Report")
            .addFields(
                { name: 'Your social credit score is ', value: `${1000} points`},
            )
            .setFooter('For more information about your credit,  go f urself, cause the government dont care!');;

        message.channel.send(mbed);
    }
};