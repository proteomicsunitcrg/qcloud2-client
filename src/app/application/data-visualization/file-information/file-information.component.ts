import { Component, OnInit, Input } from '@angular/core';
import { SampleTypeCategory } from '../../../models/sampleTypeCategory';
import { ActivatedRoute } from '@angular/router';
import { SampleType } from '../../../models/sampleType';
import { SampleTypeService } from '../../../services/sample-type.service';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-file-information',
  templateUrl: './file-information.component.html',
  styleUrls: ['./file-information.component.css']
})
/**
 * This class will display the TIC a file. When it load it will
 * get the last file and then it will listen to the plot clicks
 */
export class FileInformationComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private sampleTypeService: SampleTypeService,
    private fileService: FileService) { }

  @Input() sampleTypeCategory: SampleTypeCategory;

  private sampleType: SampleType;

  file: File;


  ngOnInit() {
    // Subscribe to route and get the last file information
    this.route.params.subscribe(
      (params) => {
        if (params.type === 'instrument') {
          /**
           * if we have a sampleTypeCategory get the last file
           * because the default views have a default sample type per category.
           */
          this.loadLastFile(params.apiKey);
        }
      }
    );
  }


  private loadLastFile(apikey: string): void {
    this.sampleTypeService.getDefaultSampleTypeBySampleTypeCategory(this.sampleTypeCategory)
      .subscribe(
        (sampleType) => {
          this.sampleType = sampleType;
        }, err => console.log(err),
        () => {
          // load the last file. At this time we have the sample type and the instrument api key
          this.fileService.getLastFileBySampleTypeAndLabSystem(this.sampleType, apikey)
            .subscribe(
              (file) => {
                this.file = file;
              }
            );
        }
      );
  }

}
