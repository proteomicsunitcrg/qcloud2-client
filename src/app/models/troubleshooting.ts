export class Troubleshooting {

    name: string;
    description: string;
    qccv: string;
    apiKey: string;

    constructor(name: string, description: string, qccv: string, apiKey: string) {
        this.name = name;
        this.description = description;
        this.qccv = qccv;
        this.apiKey = apiKey;
    }
}
