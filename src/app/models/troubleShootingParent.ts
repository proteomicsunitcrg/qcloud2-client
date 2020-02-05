export class TroubleShootingParent {

    id: number;
    apiKey: string;
    name: string;
    description: string;
    qccv: string;
    constructor(id: number, apiKey: string,name: string, description: string, qccv: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.qccv = qccv;
        this.apiKey = apiKey;
    }
}
