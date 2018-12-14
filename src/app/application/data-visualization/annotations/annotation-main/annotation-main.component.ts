import { Component, OnInit, OnDestroy } from '@angular/core';
import { TroubleshootingType } from '../../../../models/troubleshootingType';
import { PlotService } from '../../../../services/plot.service';
import { Subscription } from 'rxjs';
import { FileService } from '../../../../services/file.service';
import { File } from '../../../../models/file';
declare var M: any;

@Component({
  selector: 'app-annotation-main',
  templateUrl: './annotation-main.component.html',
  styleUrls: ['./annotation-main.component.css']
})
export class AnnotationMainComponent implements OnInit, OnDestroy {

  constructor(private plotService: PlotService,
    private fileService: FileService) { }

  troubleshootingTypesENUM = TroubleshootingType;

  plotFileChecksum$: Subscription;

  checksum: string;

  file: File;

  ngOnInit() {
    this.subscribeToPlotChecksum();
  }

  ngOnDestroy() {
    this.plotFileChecksum$.unsubscribe();
  }

  private subscribeToPlotChecksum(): void {
    this.plotFileChecksum$ = this.plotService.fileChecksum$
      .subscribe((checksum) => {
        this.loadFile(checksum);
      });
  }

  private loadFile(checksum: string): void {
    this.fileService.getFileByChecksum(checksum)
      .subscribe(
        (file) => {
          this.file = file;
        }
      );
  }

  // returns keys of enum
  troubleshootingTypes(): Array<string> {
    const keys = Object.keys(this.troubleshootingTypesENUM);
    return keys;
  }

}
