import { Message, MessageEmbed } from "discord.js";

const badKeywords = new Map<string, number>([
    ["WinnieThePooh", 10], ["FalunGong", 10], ["TaiwanIsACountry", 10], ["TiananmenSquare", 50]
]);

class ContentAnalyzer {
    public text: string;
    public message: Message;

    public constructor(text: string, message: Message) {
        this.text = text;
        this.message = message;
    }

    private analyze() {
        var resultingScore: number = 0;
        const noWhitespace = this.text.replace(/\s+/g, '');
        const lowered = noWhitespace.toLowerCase();
        
        const text = lowered;
        badKeywords.forEach((v: number, keyword: string) => {
            const processedKeyword = keyword.toLowerCase();
            if (text.includes(processedKeyword))
                resultingScore -= v;
        });

        return resultingScore;
    }

    public analyzeAndRespond() {
        const score = this.analyze();
        if (score != 0) {
            if (score < 0) {
                const channel = this.message.channel;
                //channel.send(`Your message shows signs of subversive activity, your credit score is lowered by ${score.toString()} points. Bless Xi!`);
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
            }
        }
    }
}

export default ContentAnalyzer;