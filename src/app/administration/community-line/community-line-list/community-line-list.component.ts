import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommunityLine } from '../../../models/CommunityLine';
import { Node } from '../../../models/node';
import { CommunityService } from '../../../services/community.service';
import { UserService } from '../../../services/user.service';
import { delay } from 'q';
declare var M: any;

@Component({
    selector: 'app-community-line-list',
    templateUrl: './community-line-list.component.html',
    styleUrls: ['./community-line-list.component.css']
})
export class CommunityLineListComponent implements OnInit {

    constructor(private commService: CommunityService, private nodeService: UserService) { }

    communityLines: CommunityLine[];
    allNodes: Node[];
    @Output() openThreshold: EventEmitter<string> = new EventEmitter<string>();


    ngOnInit() {
        M.updateTextFields();
        M.AutoInit();
        this.getAllNodes();
    }

    private getAllCommunityLines(): void {
        this.commService.getAllCommunityLines().subscribe(
            (result) => {
                console.log(result);
                this.communityLines = result;
                // this.allNodes = 
            },
            (error) => {
                console.log(error);
            }
        );
    }

    private getAllNodes(): void {
        this.nodeService.getAllNodesNoFiles().subscribe(
            (allNodesFromCall) => {
                this.commService.getAllCommunityLines().subscribe(
                    (result) => {
                        this.communityLines = result;
                        for (let communityLine of this.communityLines) {
                            this.allNodes = []
                            console.log("viend: " + communityLine.name);
                            
                            this.allNodes = allNodesFromCall;
                            for (let nodeInLine of communityLine.nodes) {
                                // console.log(nodeInLine);
                                
                                for (let nodo of this.allNodes) {
                                    if (nodeInLine.name == nodo.name) {
                                        // console.log("match: " + nodeInLine.name + "  " + nodo.name);
                                        
                                        (nodo as any).selected = true;
                                        // console.log(this.allNodes);
                                        
                                    } 
                                }
                                
                            }
                            
                            console.log("volta total");
                            
                            communityLine.nodes = [];
                            communityLine.nodes = this.allNodes;
                            console.log(this.allNodes);
                            
                            this.allNodes = []
                            console.log(this.allNodes);
                            for (let nodo of allNodesFromCall) {
                                (nodo as any).selected = false;
                            }
                            console.log(communityLine);
                        }
                        console.log(this.communityLines);
                    },
                    (error) => {
                        console.log(error);
                    }, () => {
                        delay(1).then(() => M.AutoInit());
                    }
                );

            }, (error) => {
                console.error(error);
            }, () => {
                delay(1).then(() => M.AutoInit());
            }
        )
    }

    openForm(event): void {
        this.openThreshold.emit('fale');
    }



}
