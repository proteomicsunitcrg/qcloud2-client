import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { File } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-single-file-view-main',
  templateUrl: './single-file-view-main.component.html',
  styleUrls: ['./single-file-view-main.component.css']
})
export class SingleFileViewMainComponent implements OnInit {

  constructor(private fileService: FileService, private activeRoute: ActivatedRoute, private router: Router) {
    this.activeRoute.params.subscribe(
      params => {
        if (params['checksum'] == undefined) {
          this.router.navigate([])
        } else {
          this.getFileByChecksum(params['checksum']);
        }
      }
    );
   }

  file: File;

  ngOnInit() {
  }

  private getFileByChecksum(checksum: string): void {
    this.fileService.getFileByChecksum(checksum).subscribe(
      res => {
        this.file = res;
        console.log(res);
      },
      err => {
        console.error(err);
      }
    );
  }

}
