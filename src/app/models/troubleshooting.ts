export class Troubleshooting {

    id: number;
    name: string;
    description: string;
    qccv: string;
    apiKey: string;
    parent: Troubleshooting;
    childs: Troubleshooting[];
    type: string;
    constructor(id: number, name: string, description: string, qccv: string, apiKey: string,
        parent: Troubleshooting, childs: Troubleshooting[], type: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.qccv = qccv;
        this.apiKey = apiKey;
        this.parent = parent;
        this.childs = childs;
        this.type = type;
    }
}
