export class ContextSource {
    id: number;
    name: string;
    abbreviated: string;
    apiKey: string;

    constructor(id: number, name: string, abbreviated: string, apiKey: string) {
        this.id = id;
        this.name = name;
        this.abbreviated = abbreviated;
        this.apiKey = apiKey;
    }
}
