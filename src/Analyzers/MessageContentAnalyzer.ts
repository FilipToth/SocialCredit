import { Message, MessageEmbed, User } from "discord.js";
import { Config } from "../Interfaces";
import ConfigJson from '../config.json'
import { AnalysisResult } from "./AnalysisResult"; 
import CreditManager from "../DB/CreditManeger";

const badKeywords = new Map<string, number>([
    ["WinnieThePooh", 10], ["FalunGong", 10], ["TaiwanIsACountry", 10], ["TiananmenSquare", 50],
    ["StandWithHongKong", 15], ["FreeTibet", 15], ["TaiwanIsACountry", 10], ["uyghurgenocide", 15],
    ["xinjianggenocide", 15], ["genocide", 5], ["DeathToXi", 100], ["DieXi", 100], ["DalaiLama", 10], 
    ["AntiRightistStruggle", 15], ["FreeHongKong", 20], ["ChingChong", 5], ["ChongChing", 5]
]);

const creditManager = new CreditManager();

class ContentAnalyzer {
    public text: string;
    public message: Message;
    public config: Config;

    public constructor(text: string, message: Message) {
        this.text = text;
        this.message = message;
        this.config = ConfigJson;
    }

    public async analyzeAndRespond() {
        const result = this.analyze();
        const score = result.score;
        const keywords = result.keywordsFound;

        if (score != 0) {
            if (score < 0) {
                const channel = this.message.channel;
                const mbed = new MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle("Subversive Activity and Domestic Terrorism")
                    .setURL("http://english.www.gov.cn/state_council/2014/09/09/content_281474986284154.htm")
                    .addFields(
                        { name: 'Your social credit score is lowered by', value: `${score.toString()} points`},
                    )
                    .setImage('http://mod.gov.cn/16501.files/logo.png')
                    .setFooter('For more information, contact your local Party Official. And go f urself, cause the govt dont care!');

                channel.send( { embeds: [mbed] });

                await this.changeCredit(this.message.author, score);

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

    private analyze() : AnalysisResult {
        var resultingScore: number = 0;
        var keywordsFound = [];
        
        const text = this.processInput(this.text);
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

    private processInput(text: string): string {
        const regex = [/\s+/g, /\-/g, /\_/g, /\(/g, /\)/g, /\+/g, /\*/g, /\&/g, /\$/g, /\@/g, /\!/g, /\#/g, /\./g, /\,/g, /\^/g];
        var processed = this.text;

        regex.forEach((expression) => {
            processed = processed.replace(expression, "");
        })
        
        processed = processed.toLowerCase();
        return processed;
    }
    

    private async changeCredit(user: User, credit: number) {
        const creditFromDB: number = await creditManager.getCredit(user);
        this.SetCredit(user, creditFromDB + credit);
    }

    private async SetCredit(user: User, credit: number) {
        creditManager.trySetCredit(user, credit);
    }
}

export default ContentAnalyzer;