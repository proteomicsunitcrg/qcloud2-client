import { CV } from './cv';
import { Node } from './node';
export class DataSource {
    id: number;
    name: string;
    cv: CV;
    node: Node;
    apiKey: string;
    enabled: boolean;

    constructor(id: number, name: string, cv: CV, node: Node, apiKey: string, enabled: boolean) {
        this.id = id;
        this.name = name;
        this.cv = cv;
        this.node = node;
        this.apiKey = apiKey;
        this.enabled = enabled;
    }
}
