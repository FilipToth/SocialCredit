export class AnalysisResult {
    keywordsFound?: string[];
    score: number; 

    public constructor(score: number, keywordsFound?: string[]) {
        this.score = score;
        this.keywordsFound = keywordsFound;
    }
}