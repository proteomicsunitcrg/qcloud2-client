import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommunityLine } from '../../../models/CommunityLine';
import { Node } from '../../../models/node';
import { CommunityService } from '../../../services/community.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from '../../../shared/ToastConfig';
declare var M: any;

@Component({
  selector: 'app-community-line-list',
  templateUrl: './community-line-list.component.html',
  styleUrls: ['./community-line-list.component.css']
})
export class CommunityLineListComponent implements OnInit {

  constructor(private commService: CommunityService, private nodeService: UserService,
    private toastr: ToastrService) { }

  // Array to store all the community lines
  communityLines: CommunityLine[] = [];

  // Array to store all nodes
  allNodes: any[];

  // Output to emit to show new line form
  @Output() openThreshold: EventEmitter<string> = new EventEmitter<string>();

  nodeKey: any[];

  ngOnInit() {
    this.getAllCommunityLines();
    M.updateTextFields();
    M.AutoInit();
  }

  /**
  * @summary Return the promise with all nodes.
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  * @returns Promise<Node[]> with all nodes
  */
  private getAllCommunityLines() {
    this.commService.getAllCommunityLines().subscribe(
      (result) => {
        this.communityLines = result;
        this.getAllNodes().then(res => {
          this.allNodes = res;
          for (const communityLine of this.communityLines) {
            this.getNodesInCommunityLineRelation(communityLine).then((res2) => {
              this.mountSelect(res2, communityLine.apiKey);
            });
          }
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /**
  * @summary Mount all the selects with the selecteds and the unselecteds
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  * @param nodesInRelation Node[] nodes linked with the line
  * @param lineApiKey apiKey of the linked line
  */
  private mountSelect(nodesInRelation: Node[], lineApiKey: string) {
    const select = <HTMLSelectElement>document.getElementById(lineApiKey);
    const copy = this.allNodes;
    for (const node of nodesInRelation) {
      copy.forEach((item, index) => {
        if (item.name === node.name) {
          copy.splice(index, 1);
        }
      });
    }
    for (const node of nodesInRelation) {
      const newoption = new Option(node.name, node.apiKey, null, true);
      select.add(newoption);
    }

    for (const node of copy) {
      const newoption = new Option(node.name, node.apiKey, null, false);
      select.add(newoption);
    }
    M.updateTextFields();
    M.AutoInit();
  }

  /**
   * @summary Makes or deletes a relation between the node and the line
   * @description If is the nodeKey is empty means that the select is empty
   * and the API endpoint its different
   * @param line CommunityLine related to update
   */
  public updateRelation(line: CommunityLine) {
    if (this.nodeKey.length === 0) {
      this.commService.deleteAllRelations(line.id).subscribe(
        () => this.toastr.success('Relation updated', null, TOASTSETTING),
        () => this.toastr.error('Error updating the relation', null, TOASTSETTING)
      );
    } else {
      this.commService.makeDeleteRelation(this.nodeKey, line).subscribe(
        () => this.toastr.success('Relation updated', null, TOASTSETTING),
        () => this.toastr.error('Error updating the relation', null, TOASTSETTING)
      );
    }
  }

  /**
  * @summary Return the promise with all nodes.
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  * @returns Promise<Node[]> with all nodes
  */
  private getAllNodes(): Promise<Node[]> {
    return this.nodeService.getAllNodesNoFiles().toPromise();
  }

  /**
  * @summary Return the promise with all nodes with that are linked with the community line
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  * @param
  * @returns Promise<Node[]> with all nodes related to the commLine
  */
  private getNodesInCommunityLineRelation(commLine: CommunityLine): Promise<any> {
    return this.commService.getNodesInCommunityLineRelation(commLine).toPromise();
  }

  /**
   * Emits the output to show the new line builder
   */
  openFormEvent(isEdition: boolean, id?: string): void {
    if (isEdition) {
      this.openThreshold.emit(id);
    } else {
      this.openThreshold.emit("noEdit");
    }
  }

  /**
  * @summary deletes a communityLine
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  * @returns Promise<Node[]> with all nodes
  */
  public deleteLine(id: number): void {
    this.commService.delete(id).subscribe(
      (res: boolean) => {
        this.getAllCommunityLines();
        this.toastr.success('Community threshold deleted', null, TOASTSETTING);
      },
      (err: Error) => this.toastr.error('Error deleting the line', null, TOASTSETTING)
    );
  }

}

