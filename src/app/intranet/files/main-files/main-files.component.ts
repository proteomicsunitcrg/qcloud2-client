import { Component, OnInit } from '@angular/core';
import { FileIntranetService } from '../../../services/file-intranet.service';

@Component({
  selector: 'app-main-files',
  templateUrl: './main-files.component.html',
  styleUrls: ['./main-files.component.css']
})
export class MainFilesComponent implements OnInit {

  constructor(private fileService: FileIntranetService, ) { }

  pipelineOk: boolean;

  apiOK: boolean;

  ngOnInit() {
    this.getPipelineStatus();
    this.getAPIStatus();
  }

  private getPipelineStatus(): void {
    this.fileService.getPipelineStatus().subscribe(
      res => this.pipelineOk = res,
      err => console.error(err)
    );
  }

  private getAPIStatus(): void {
    this.fileService.getAPIStatus().subscribe(
      res => this.apiOK = res,
      err => console.error(err)
    );
  }

}
