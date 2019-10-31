export class Troubleshooting {

    name: string;
    description: string;
    qccv: string;
    apiKey: string;
    enabled: boolean
    constructor(name: string, description: string, qccv: string, apiKey: string, enabled: boolean) {
        this.name = name;
        this.description = description;
        this.qccv = qccv;
        this.apiKey = apiKey;
        this.enabled = enabled;
    }
}
