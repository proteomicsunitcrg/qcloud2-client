import { CommunityLine } from "./CommunityLine";
import { Node } from "./node";

export class CommunityLineNode {
    active: boolean;
    communityLine: CommunityLine;
    node: Node;

    constructor(active: boolean, communityLine: CommunityLine, node: Node) {
        this.active = active;
        this.communityLine = communityLine;
        this.node = node;
    }
}