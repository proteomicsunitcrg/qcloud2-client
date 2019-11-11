import { Node } from './node';

export class NodeAndStats {
    public node: Node;
    public filesLastWeek: number;

    constructor(node: Node, filesLastWeek: number) {
        this.node = node;
        this.filesLastWeek = filesLastWeek;
    }
}