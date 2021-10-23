import { Suggestion } from "../Interfaces/Suggestion";

class SuggestionList {

    private suggestions: Map<number, Suggestion> = new Map<number, Suggestion>();

    public getSuggestions(): Set<Suggestion>{
        const set = new Set<Suggestion>();
        this.suggestions.forEach(s => {
            set.add(s);
        })

        return set;
    }

    public getSuggestionByID(id: number): Suggestion {
        var suggestion = this.suggestions.get(id);
        return suggestion;
    }

    public addSuggestion(id: number, suggestion: Suggestion) {
        this.suggestions.set(id, suggestion);
    }

    static getList() : SuggestionList {
        return List;
    }
}

const List = new SuggestionList();

export default SuggestionList;