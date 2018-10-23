import { CV } from './cv';
import { Node } from './node';
export class DataSource {
    id: number;
    name: string;
    cv: CV;
    node: Node;
    apiKey: string;
    enabled: boolean;
    serialNumber: string;

    constructor(id: number, name: string, cv: CV, node: Node, apiKey: string, enabled: boolean, serialNumber: string) {
        this.id = id;
        this.name = name;
        this.cv = cv;
        this.node = node;
        this.apiKey = apiKey;
        this.enabled = enabled;
        this.serialNumber = serialNumber;
    }
}
