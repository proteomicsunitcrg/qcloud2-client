export class Logo {
    id: number;
    apiKey: String;
    url: String;
    alt: String;
    name: String;
    active: boolean;


    constructor(id: number, apiKey: String, url: String, alt: String, name: String, active: boolean) {
        this.id = id;
        this.apiKey = apiKey;
        this.url = url;
        this.alt = alt;
        this.name = name;
        this.active = active;
    }
}
