export class Link {
    id: number;
    apiKey: String;
    url: String;
    name: String;


    constructor(id: number, apiKey: String, url: String, name: String) {
        this.id = id;
        this.apiKey = apiKey;
        this.url = url;
        this.name = name;
    }
}
