import { CV } from "./cv";
import { Node } from './node';
import { GuideSet } from './guideSet';
export class DataSource {
    id: number;
    name: string;
    cv: CV;
    node: Node;
    apiKey: string;
    guideSet: GuideSet;

    constructor(id: number,name:string, cv:CV, node: Node, apiKey: string, guideSet: GuideSet) {
        this.id = id;
        this.name = name;
        this.cv = cv;
        this.node = node;
        this.apiKey = apiKey;
        this.guideSet = guideSet;
    }
}