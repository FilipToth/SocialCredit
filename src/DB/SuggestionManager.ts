import { User } from "discord.js";
import { Collection } from "mongoose";
import FaunaConnector from "./FaunaConnector";
import { Suggestion } from "../Interfaces/Suggestion";

const connector = new FaunaConnector();
const collectionName = "Suggestions";
const documentID = "305570265016828484";

class SuggestionManager {
    public async sendSuggestion(keyword: string, good: boolean, points: number, author: User) {
        const uuid = this.uuid();
        const authorID = author.id;

        var jsonToInsert = {};
        jsonToInsert[`${uuid}`] = {
            "keyword": keyword,
            "good": good,
            "points": points,
            "author": authorID
        }

        const response = await connector.updateDocument(collectionName, documentID, {data: jsonToInsert});
        return response;
    }

    public async getSuggestions(): Promise<Suggestion[]> {
        const document = await connector.getDocument(collectionName, documentID);
        const data = document['data'];
        var suggestions: Suggestion[] = [];

        for (const i in data) {
            const sug: Suggestion = data[i];
            suggestions.push(sug);
            console.log("sug: ");
        }
        
        return suggestions;
    }

    public async approveSuggestion() {
        
    }

    private uuid() {  
        var uuidValue = "", k, randomValue;  
        for (k = 0; k < 32; k++) {  
          randomValue = Math.random() * 16 | 0;  
        
          if (k == 8 || k == 12 || k == 16 || k == 20) {  
            uuidValue += "-"  
          }  
          uuidValue += (k == 12 ? 4 : (k == 16 ? (randomValue & 3 | 8) : randomValue)).toString(16);  
        }  
        return uuidValue;  
    }
}

export default SuggestionManager;