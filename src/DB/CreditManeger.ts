import { User } from "discord.js";
import FaunaConnector from "./FaunaConnector";

const connector = new FaunaConnector();

const collectionName = "Credit";
const collectionID = "303785692984508995";

class CreditManager {
    public async getCredit(author: User): Promise<number> {
        const doc = await connector.getDocument(collectionName, collectionID).catch(() => console.log("failed to fetch credit data"));
        const data = doc.data[author.id];
        if (data == undefined) {
            const jsonToInsert = {};
            jsonToInsert[`${author.id}`] = { "credit": "1000" }
    
            await connector.updateDocument(collectionName, collectionID, {data: jsonToInsert});
            
            return 1000;
        }
    
        const credit = data["credit"];
    
        return Number(credit);
    }

    public async getAllCredits(): Promise<Map<string, number>> {
        const doc = await connector.getDocument(collectionName, collectionID).catch(() => console.log("failed to fetch credit data"));
        var credits = new Map<string, number>();
        
        for (var user in doc["data"]) {
            credits.set(user, Number(doc["data"][user]["credit"]));
        }

        return credits;
    }

    public async trySetCredit(author: User, credit: number) {
        const jsonToInsert = {};    
        jsonToInsert[`${author.id}`] = { "credit": credit }
    
        await connector.updateDocument(collectionName, collectionID, {data: jsonToInsert}).catch(() => {return false});

        return true;
    }
};

export default CreditManager;