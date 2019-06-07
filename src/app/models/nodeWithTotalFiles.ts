import { Node } from './node';

export class NodeWithTotalFiles {
    node: Node;
    totalFiles: number;

    constructor(node: Node, totalFiles: number) {
        this.node = node;
        this.totalFiles = totalFiles;
    }
}
