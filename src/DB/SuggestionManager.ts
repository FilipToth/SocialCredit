import { User } from "discord.js";
import { Collection } from "mongoose";
import FaunaConnector from "./FaunaConnector";
import { Suggestion } from "../Interfaces/Suggestion";
import { writeFileSync, readFile } from "fs";
import { Config } from "../Interfaces";
import ConfigJson from "../config.json";
import { getJSDocEnumTag } from "typescript";

const connector = new FaunaConnector();
const collectionName = "Suggestions";
const documentID = "305570265016828484";
const config: Config = ConfigJson;

class SuggestionManager {
    public async sendSuggestion(keyword: string, good: boolean, points: number, author: User) {
        const uuid = this.uuid();
        const authorID = author.id;

        var jsonToInsert = {};
        jsonToInsert[`${uuid}`] = {
            "uuid": uuid,
            "keyword": keyword,
            "good": good,
            "points": points,
            "author": authorID
        }

        const response = await connector.updateDocument(collectionName, documentID, {data: jsonToInsert});
        return response;
    }

    public async removeSuggestion(uuid: string) {
        const document = await connector.getDocument(collectionName, documentID);

        const jsonToInsert = document['data']
        jsonToInsert[uuid] = null;

        console.log(jsonToInsert);

        await connector.updateDocument(collectionName, documentID, {data: jsonToInsert});
    }

    public async getSuggestions(): Promise<Suggestion[]> {  
        const document = await connector.getDocument(collectionName, documentID);
        const data = document['data'];
        var suggestions: Suggestion[] = [];

        for (const i in data) {
            const sug: Suggestion = data[i];
            suggestions.push(sug);
        }
        
        return suggestions;
    }

    public async approveSuggestion(suggestion: Suggestion) {
        const json = {
            "keyword": suggestion.keyword,
            "points": suggestion.points,
            "good": suggestion.good,
            "uuid": suggestion.uuid,
        }
        
        readFile(config.keywordsJsonPath, (err, data) => {
            let text = data.toString();
            var currentJSON: any = null;
            
            if (text.length == 0)
                currentJSON = {};
            else
                currentJSON = JSON.parse(text);
            
            currentJSON[suggestion.uuid] = json;
            writeFileSync(config.keywordsJsonPath, JSON.stringify(currentJSON, null, '\t'));
        });

        this.removeSuggestion(suggestion.uuid);
    }

    private uuid() {
        var uuidValue = "", k, randomValue;
        for (k = 0; k < 32; k++) {  
          randomValue = Math.random() * 16 | 0;  
        
          if (k == 8 || k == 12 || k == 16 || k == 20) {  
            uuidValue += "-";
          }  
          uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);  
        }

        return uuidValue;  
    }
}

export default SuggestionManager;