import { Command, Config } from "../../Interfaces";
import { Message } from "discord.js";
import SuggestionManager from "../../DB/SuggestionManager";

const manager = new SuggestionManager();

export const command: Command = {
    name: 'suggest',
    aliases: ['sg', 'suggestkeyword'],
    run: async(client, message, args) => {
        var isValid = true;

        if (args.length < 1 || args.length > 3)
        {
            sendUsage(message);
            return;
        }

        var keyword = args[0];
        var goodOrBad = args[1].toLowerCase();
        var ptsStr = args[2];

        
        if (goodOrBad != "good" && goodOrBad != "bad")
            sendUsage(message);

        var good = goodOrBad == "good";
        
        var pts: number = parseInt(ptsStr);;
        if (pts.toString() == "NaN")
        {
            sendUsage(message);
            return;
        }

        // proceed
        const response = await manager.sendSuggestion(keyword, good, pts, message.author);
    }
};

function sendUsage(message: Message) {
    message.channel.send(`Usage: ${process.env.PREFIX}suggest <Keyword> <GoodOrBad> <Points>`);
    message.channel.send(`Example: \`${process.env.PREFIX}suggest WinnieThePooh Bad 10\` -Whenever someone sends a message with this keyword, it'll subtract 10 points from their account`);
}