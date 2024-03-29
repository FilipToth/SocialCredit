import { Client, Collection } from "discord.js";
import path from 'path';
import { readdirSync } from "fs";
import { Config, Event, Command } from '../Interfaces';
import SuggestionList from "../SuggestionSystem/SuggestionListManager";
import SuggestionManager from "../DB/SuggestionManager";
import { Suggestion } from "../Interfaces/Suggestion";
import { Admins } from "../Interfaces/Admins";
import AdminsJson from '../admins.json';

const suggestionList = SuggestionList.getList();
const suggestionManager = new SuggestionManager();

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection<string, Command>();
    public events: Collection<string, Event> = new Collection<string, Event>();
    public aliases: Collection<string, Command> = new Collection<string, Command>();
    public admins: Admins = AdminsJson;

    public async init() {
        this.login(process.env.TOKEN);

        // commands
        const commandPath = path.join(__dirname, "..", "Commands");
        readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => 
                file.endsWith(".ts")
            );

            for (const file of commands) {
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);

                if (command?.aliases.Length != 0) {
                    command.aliases.forEach((alias) => {
                        this.aliases.set(alias, command);
                    });
                }

                console.log(command);
            }
        });
        
        // event
        const eventPath = path.join(__dirname, "..", "Events");
        console.log("loading events...");
        readdirSync(eventPath).forEach(async(file) => {
            const { event } = await import(path.join(eventPath, file)); //`${eventPath}/${file}`, 
            this.events.set(event.name, event);
            console.log(file);
            this.on(event.name, event.run.bind(null, this));
        });

        this.on("interactionCreate", async(interaction) => {
            if (interaction.isButton()) {
                console.log(interaction.user.id);
                if (this.admins.admins.includes(interaction.user.id))
                {
                    if (interaction.customId.includes("approve_btn #"))
                    {
                        // approve button
                        const index: number = Number.parseInt(interaction.customId.replace("approve_btn #", ""));
                        const suggestion: Suggestion = suggestionList.getSuggestionByID(index);

                        suggestionManager.approveSuggestion(suggestion);
                        interaction.channel.send(`suggestion '${suggestion.uuid}' **approved**!`);
                    }
                    else if (interaction.customId.includes("remove_btn #")) {
                        // remove button
                        const index = Number.parseInt(interaction.customId.replace("remove_btn #", ""));
                        const suggestion: Suggestion = suggestionList.getSuggestionByID(index);

                        suggestionManager.removeSuggestion(suggestion.uuid)
                        interaction.channel.send(`suggestion '${suggestion.uuid}' **removed**!`);
                    }
                }
                else
                {
                    interaction.channel.send("You don't have permissions to do that!");
                }
            }
        })
    }
}

export default ExtendedClient;