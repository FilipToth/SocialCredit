import { Command, Config } from "../../Interfaces";
import { MessageEmbed, User } from "discord.js";
import FaunaConnector from "../../DB/FaunaConnector";

const connector = new FaunaConnector();

export const command: Command = {
    name: 'credit',
    aliases: ['c'],
    run: async(client, message, args) => {
        const credit = await getCredit(message.author).catch(() => console.log("failed1"));
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

async function getCredit(author: User): Promise<number> {
    const collectionName = "Credit";
    const collectionID = "303785692984508995";

    const doc = await connector.getDocument(collectionName, collectionID).catch(() => console.log("failed"));
    const data = doc.data[author.id];
    if (data == undefined) {
        const jsonToInsert = {};
        jsonToInsert[`${author.id}`] = { "credit": "1000" }

        console.log(jsonToInsert);

        await connector.updateDocument(collectionName, collectionID, {data: jsonToInsert});

        return 1000;
    }

    const credit = data["credit"];

    return Number(credit);
}