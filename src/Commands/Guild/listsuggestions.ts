import { Command } from "../../Interfaces";
import { Message, MessageActionRow, MessageButton } from "discord.js";
import SuggestionManager from "../../DB/SuggestionManager";
import { Suggestion } from "../../Interfaces/Suggestion";
import SuggestionList from "../../SuggestionSystem/SuggestionListManager";

const suggestionList = SuggestionList.getList();
const manager = new SuggestionManager();

export const command: Command = {
    name: 'listsuggestions',
    aliases: ['lsuggestions', 'lsg', 'listsg'],
    run: async(client, message, args) => {
        const suggestions: Suggestion[] = await manager.getSuggestions();

        let index = 1;
        suggestions.forEach(s => {
            
            let apBtn = new MessageButton()
                .setStyle('SUCCESS')
                .setLabel('approve')
                .setCustomId(`approve_btn #${index}`);

            let rmBtn = new MessageButton()
                .setStyle('DANGER')
                .setLabel('remove')
                .setCustomId(`remove_btn #${index}`);

            let row = new MessageActionRow()
                .addComponents(apBtn, rmBtn);
            
            var good = s.good ? "Good" : "Bad";
            message.channel.send({ content: `#${index} - ${s.keyword} - ${good} - ${s.points.toString()}`, components: [row] });
            if (suggestions.length > 1 && index < suggestions.length)
                message.channel.send("----------------------------------------------------------");

            suggestionList.addSuggestion(index, s);

            index++;
        });
    }
};