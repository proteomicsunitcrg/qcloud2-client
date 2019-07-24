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

    communityLines: CommunityLine[] = [];
    allNodes: Node[];
    @Output() openThreshold: EventEmitter<string> = new EventEmitter<string>();


    ngOnInit() {
        M.updateTextFields();
        M.AutoInit();
        // this.getAllNodes();
        this.getAllCommunityLines();
    }

    private getAllCommunityLines(): void {
        this.commService.getAllCommunityLines().subscribe(
            (result) => {
                console.log(result);
                this.communityLines = result;
                
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
                        console.log(result);
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
