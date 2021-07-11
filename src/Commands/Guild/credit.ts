import { Command, Config } from "../../Interfaces";
import { MessageEmbed, User } from "discord.js";
import CreditManager from "../../DB/CreditManeger";

const creditManager = new CreditManager();

export const command: Command = {
    name: 'credit',
    aliases: ['c'],
    run: async(client, message, args) => {
        const credit = await creditManager.getCredit(message.author).catch(() => console.log("failed to get the credit"));
        const mbed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Social Credit Report")
            .addFields(
                { name: 'Your social credit score is ', value: `${credit} points`},
            )
            .setFooter('For more information about your credit,  go f urself, cause the government dont care!');;

        message.channel.send(mbed);
    }
};