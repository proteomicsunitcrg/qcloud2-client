import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommunityLine } from '../../../models/CommunityLine';
import { Node } from '../../../models/node';
import { CommunityService } from '../../../services/community.service';
import { UserService } from '../../../services/user.service';
declare var M: any;

@Component({
  selector: 'app-community-line-list',
  templateUrl: './community-line-list.component.html',
  styleUrls: ['./community-line-list.component.css']
})
export class CommunityLineListComponent implements OnInit {

  constructor(private commService: CommunityService, private nodeService: UserService) { }

  // Array to store all the community lines
  communityLines: CommunityLine[] = [];

  // Array to store all nodes
  allNodes: any[];

  // Output to emit to show new line form
  @Output() openThreshold: EventEmitter<string> = new EventEmitter<string>();

  nodeKey: any[];

  ngOnInit() {
    // this.getAllNodes();
    this.getAllCommunityLines();
    M.updateTextFields();
    M.AutoInit();
  }

  /**
   * Get all community lines from the server to mount the table
   */
  private getAllCommunityLines() {
    this.commService.getAllCommunityLines().subscribe(
      (result) => {
        this.communityLines = result;
        this.getAllNodes().then(res => {
          this.allNodes = res;
          for (let communityLine of this.communityLines) {
            this.getNodesInCommunityLineRelation(communityLine).then((res) => {
              this.mountSelect(res, communityLine.apiKey);
            });
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  private mountSelect(nodesInRelation, lineApiKey) {
    let select = <HTMLSelectElement>document.getElementById(lineApiKey);
    let copy = this.allNodes;
    for (let node of nodesInRelation) {
      copy.forEach((item, index) => {
        if (item.name === node.name) copy.splice(index, 1);
      });
    }
    for (let node of nodesInRelation) {
      let newoption = new Option(node.name, node.apiKey, null, true);
      select.add(newoption);
    }

    for (let node of copy) {
      let newoption = new Option(node.name, node.apiKey, null, false);
      select.add(newoption);
    }
    M.updateTextFields();
    M.AutoInit();
  }

  private updateRelation(line: CommunityLine) {
    console.log(this.nodeKey);
    if (this.nodeKey.length === 0) {
      this.commService.deleteAllRelations(line.id).subscribe(
        result => {
          console.log(result);
        },
        error => console.error(error)
      );
    } else {
      this.commService.makeDeleteRelation(this.nodeKey, line).subscribe(
        result => {
          console.log(result);
        },
        error => {
          console.log(error);
        }
      );
    }


  }
  /**
   * Get all nodes from the server to show the selects
   */
  private getAllNodes(): Promise<any> {
    return this.nodeService.getAllNodesNoFiles().toPromise();
  }

  private getNodesInCommunityLineRelation(commLine): Promise<any> {
    return this.commService.getNodesInCommunityLineRelation(commLine).toPromise();
  }

  /**
   * Emits the output to show the new line builder
   */
  openForm(): void {
    this.openThreshold.emit('fale');
  }

  private deleteLine(id: number): void {
    this.commService.delete(id).subscribe(
      (res) => this.getAllCommunityLines(),
      (err) => console.error(err)
    );
  }

}

