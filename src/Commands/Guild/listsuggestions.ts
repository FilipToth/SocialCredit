import { Command } from "../../Interfaces";
import { Message } from "discord.js";
import SuggestionManager from "../../DB/SuggestionManager";
import { Suggestion } from "../../Interfaces/Suggestion";

const manager = new SuggestionManager();

export const command: Command = {
    name: 'listsuggestions',
    aliases: ['lsuggestions', 'lsg', 'listsg'],
    run: async(client, message, args) => {
        const suggestions: Suggestion[] = await manager.getSuggestions();

        let index = 1;
        suggestions.forEach(s => {
            message.channel.send(`#${index} - ${s.keyword}`);
            index++;
        });
    }
};