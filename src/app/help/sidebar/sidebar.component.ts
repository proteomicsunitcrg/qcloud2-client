import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../services/help.service';
import { saveAs } from 'file-saver';
import { LinkService } from '../../services/links.service';
import { Link } from '../../models/Link';
declare var M: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private helpService: HelpService, private linkService: LinkService) { }

  allLinks: Link[];

  categories = [];

  ngOnInit() {
    this.getQCrawlerLinks();

  }

  open(item): void {
    const elem = document.getElementById(item);
    const instance = M.Collapsible.init(elem);
  }

  saveFile(data: any, filename?: string) {
    const blob = new Blob([data], { type: 'application/pdf; charset=utf-8' });
    saveAs(blob, filename + '.pdf');
  }

  downloadFile(filename): void {
    this.helpService.downloadFile(filename).subscribe(
      (response) => {
        this.saveFile(response.body, filename);
      }, () => {
      }
    );
  }

  private getQCrawlerLinks(): void {
    this.linkService.getAllLinks().subscribe(
      res => {
        this.allLinks = res;
      },
      err => console.error(err)
    );
  }
}
