import { Component, OnInit } from '@angular/core';
import { CommunityService } from '../../../services/community.service';
import { CommunityLine } from '../../../models/CommunityLine';
import { Node } from '../../../models/node';
import { CommunityLineNode } from '../../../models/CommunityLineNode';

@Component({
  selector: 'app-community-line-main',
  templateUrl: './community-line-main.component.html',
  styleUrls: ['./community-line-main.component.css']
})
export class CommunityLineMainComponent implements OnInit {

  constructor(private communityService: CommunityService) { }

  communityLines: CommunityLine[] = [];

  ngOnInit() {
    this.getAllLinesForNode();
  }

  private getAllLinesForNode(): void {
    this.communityService.getCommunityLinesByNode().subscribe((result) => {
      console.log(result);

      this.communityLines = result;
    }, (error) => {
      console.error(error);

    });
  }

  public updateActive(communityLineRelation: CommunityLineNode) {
    this.communityService.updateActive(communityLineRelation).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        console.error(error);
      }
    );

  }

}
