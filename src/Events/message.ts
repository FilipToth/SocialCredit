import { Command, Event } from "../Interfaces";
import ContentAnalyzer from "../Analyzers/MessageContentAnalyzer";
import { Message } from "discord.js";

export const event: Event = {
    name: 'message',
    run: (client, message: Message) => {
        if (message.author.bot || !message.guild)
            return;

        if (!message.content.startsWith(client.config.prefix))
        {
            // analyze message contents
            const analyzer = new ContentAnalyzer(message.content, message);
            analyzer.analyzeAndRespond();
        }     

        const args = message.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);

        const cmd = args.shift().toLowerCase();
        if (!cmd)
            return;

        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command)
            (command as Command).run(client, message, args);
    }
};