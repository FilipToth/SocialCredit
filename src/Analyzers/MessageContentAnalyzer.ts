import { Message, MessageEmbed } from "discord.js";
import { Config } from "../Interfaces";
import ConfigJson from '../config.json'
import { AnalysisResult } from "./AnalysisResult"; 

const badKeywords = new Map<string, number>([
    ["WinnieThePooh", 10], ["FalunGong", 10], ["TaiwanIsACountry", 10], ["TiananmenSquare", 50]
]);

class ContentAnalyzer {
    public text: string;
    public message: Message;
    public config: Config;

    public constructor(text: string, message: Message) {
        this.text = text;
        this.message = message;
        this.config = ConfigJson;
    }

    private analyze() : AnalysisResult {
        var resultingScore: number = 0;
        const noWhitespace = this.text.replace(/\s+/g, '');
        const lowered = noWhitespace.toLowerCase();
        var keywordsFound = [];
        
        const text = lowered;
        badKeywords.forEach((v: number, keyword: string) => {
            const processedKeyword = keyword.toLowerCase();
            if (text.includes(processedKeyword))
            {
                resultingScore -= v;
                keywordsFound.push(keyword);
            }
        });

        const result = new AnalysisResult(resultingScore, keywordsFound);
        return result;
    }

    public analyzeAndRespond() {
        const result = this.analyze();
        const score = result.score;
        const keywords = result.keywordsFound;

        if (score != 0) {
            if (score < 0) {
                const channel = this.message.channel;
                const mbed = new MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle("Subversive Activity")
                    .setURL("http://mod.gov.cn/")
                    .addFields(
                        { name: 'Your social credit score is lowered by', value: `${score.toString()} points`},
                    )
                    .setImage('http://mod.gov.cn/16501.files/logo.png')
                    .setFooter('For more information, contact your local Party Official. And go f urself, cause the govt dont care!');

                channel.send(mbed);

                if (this.config.debug)
                {
                    var keywordsString = "";
                    var isFirst = true;
                    keywords.forEach((keyword: string) => {
                        
                        if (isFirst)
                        {
                            keywordsString += keyword;
                            isFirst = false;
                        } else {
                            keywordsString += ", " + keyword;
                        }
                    })

                    channel.send("keywords: " + keywordsString);
                }
            }
        }
    }
}

export default ContentAnalyzer;