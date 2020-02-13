import { Action } from "./action";

export class Problem {

    name: string;
    description: string;
    qccv: string;
    apiKey: string;
    active: boolean;
    relatedActions: Action[]
    constructor(name: string, description: string, qccv: string, apiKey: string, active: boolean, relatedActions: Action[]) {
        this.name = name;
        this.description = description;
        this.qccv = qccv;
        this.apiKey = apiKey;
        this.active = active;
        this.relatedActions = relatedActions;
    }
}
