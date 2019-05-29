import { Component, OnInit } from '@angular/core';
import { HelpService } from '../../services/help.service';
import { saveAs } from 'file-saver';
declare var M: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private helpService: HelpService) { }

  categories = [];

  ngOnInit() {

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
}
