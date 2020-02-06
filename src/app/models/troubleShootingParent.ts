import { Action } from "./action";
import { Problem } from "./problem";

export class TroubleShootingParent {

    id: number;
    apiKey: string;
    name: string;
    description: string;
    qccv: string;
    problem: Problem[];
    action: Action[];
    constructor(id: number, apiKey: string,name: string, description: string, qccv: string, problem: Problem[], action: Action[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.qccv = qccv;
        this.apiKey = apiKey;
        this.problem = problem;
        this.action = action;
    }
}
