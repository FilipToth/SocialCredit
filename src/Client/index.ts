import { Client, Collection } from "discord.js";
import path from 'path';
import { readdirSync } from "fs";
import { Config, Event, Command } from '../Interfaces';
import ConfigJson from '../config.json'

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection<string, Command>();
    public events: Collection<string, Event> = new Collection<string, Event>();
    public aliases: Collection<string, Command> = new Collection<string, Command>();
    public config: Config = ConfigJson;

    public async init() {
        this.login(this.config.token);

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

                console.log(command );
            }
        });
        
        // event
        const eventPath = path.join(__dirname, "..", "Events");
        console.log("loading events...");
        readdirSync(eventPath).forEach(async(file) => {
            const { event } = await import(path.join(eventPath, file)); //`${eventPath}/${file}`, 
            this.events.set(event.name, event);
            this.on(event.name, event.run.bind(null, this));
        });
    }
}

export default ExtendedClient;