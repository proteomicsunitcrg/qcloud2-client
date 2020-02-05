export class Action {

    name: string;
    description: string;
    qccv: string;
    apiKey: string;
    active: boolean;
    constructor(name: string, description: string, qccv: string, apiKey: string, active: boolean) {
        this.name = name;
        this.description = description;
        this.qccv = qccv;
        this.apiKey = apiKey;
        this.active = active;
    }
}
