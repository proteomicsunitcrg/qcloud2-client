import { Node } from './node'

export class NodeAndFileInfo {
    node: Node;
    dataOk: boolean;

    constructor(node: Node, dataOk: boolean) {
        this.node = node;
        this.dataOk = dataOk;
    }
}