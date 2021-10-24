import { Command, Config } from "../../Interfaces";
import { MessageEmbed, User } from "discord.js";
import CreditManager from "../../DB/CreditManeger";

const creditManager = new CreditManager();

export const command: Command = {
    name: 'leaderboard',
    aliases: ['ld'],
    run: async(client, message, args) => {
        const credits = await creditManager.getAllCredits();
        const sorted = new Map([...credits.entries()].sort((a,b) => b[1] - a[1]))
        const mbed = new MessageEmbed()
                .setTitle("Social Credit Leaderboard")
                .setDescription("Global Social Credit Leaderboard... Say: Hello, China!");
        
        var i: number = 1;
        for (let [id, credit] of sorted) {
            const user = await client.users.fetch(id);
            mbed.addField(i.toString(), `${user.username}: **${credit}**`); 
            i++;        
        }

        message.channel.send({embeds: [mbed]});
    }
};