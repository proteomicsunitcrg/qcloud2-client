import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PlotService } from '../../../services/plot.service';
import { SampleTypeCategory } from '../../../models/sampleTypeCategory';
import { SampleType } from '../../../models/sampleType';
import { File } from '../../../models/file';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SampleTypeService } from '../../../services/sample-type.service';
import { FileService } from '../../../services/file.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
declare var M: any;
@Component({
  selector: 'app-isotopologue-information',
  templateUrl: './isotopologue-information.component.html',
  styleUrls: ['./isotopologue-information.component.css']
})
export class IsotopologueInformationComponent implements OnInit, OnDestroy {

  constructor(private plotService: PlotService,
    private route: ActivatedRoute,
    private sampleTypeService: SampleTypeService,
    private fileService: FileService,
    private sampleCompositionService: SampleCompositionService) { }

  @Input() sampleTypeCategory: SampleTypeCategory;

  private sampleType: SampleType;

  file: File;

  plotFilename$: Subscription;

  collapsible: any;

  /**
   * This will prevent a malforming layout inside the component
   */
  isCollapsibleOpen: boolean;

  collapsibleOpened$: Subscription;

  firstLoad = true;

  rows = 0;
  /**
   * Change this for modify the layout of the
   * isotopologue plot display.
   */
  cols = 3;

  colsXRow = 12 / this.cols;

  plots: any[] = [];

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
      });
    this.subscribeToPlotFile();
    this.enableCollapsible();
    this.subscribeToCollapsible();
  }

  private subscribeToCollapsible(): void {
    this.collapsibleOpened$ = this.plotService.collapsibleOpened$
      .subscribe(
        (isOpen) => {
          this.isCollapsibleOpen = isOpen;
        }
      );
  }



  private enableCollapsible(): void {
    const elem = document.getElementById('iso-collapsible');
    this.collapsible = M.Collapsible.init(elem, {
      onOpenEnd:  () => {
        // time to load the plots
        this.plotService.isCollapsibleOpened(true);
      },
      onCloseEnd: () => {
        this.plotService.isCollapsibleOpened(false);
      }
    });
  }

  private openCollapsible(): void {
    // open the collapsible
    this.collapsible.open();
    window.scroll(0, 0);
  }

  private subscribeToPlotFile(): void {
    this.plotFilename$ = this.plotService.filenameFromPlot$
      .subscribe(
        (filename) => {
          this.fileService.getFileByFilename(filename)
          .subscribe(
            (file) => {
              this.file = file;
            }, err => console.log(err),
            () => {
              this.loadIsotopologues();
            }
          );
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
              }, err => console.log(err),
              () => {
                this.loadIsotopologues();
              }
            );
        }
      );
  }

  private loadIsotopologues(): void {
    this.sampleCompositionService.getAllPeptidesBySampleTypeQQCV(this.sampleType)
      .subscribe(
        (sampleCompositions) => {
          const distinctAbbreviated: string[] = [];
          const distinctCleanedSequence: string[] = [];
          sampleCompositions.forEach(
            (sampleComposition) => {
              if (distinctAbbreviated.find(item => item === sampleComposition.peptide.abbreviated) === undefined) {
                distinctAbbreviated.push(sampleComposition.peptide.abbreviated);
                const re = /(\(Heavy\))/gi;
                const cleanedSequence = sampleComposition.peptide.sequence.replace(re, '');
                distinctCleanedSequence.push(cleanedSequence);
              }
            }
          );
          // Calculate cols & rows
          if (distinctAbbreviated.length % this.cols > 0) {
            this.rows = ( distinctAbbreviated.length / this.cols) + 1;
          } else {
            this.rows = ( distinctAbbreviated.length / this.cols);
          }
          for (let i = 0 ; i < this.rows ; i++) {
            this.plots[i] = [];
            for (let j = 0, k = i * this.cols ; j < this.cols ; j++, k++) {
              this.plots[i][j] = {'abbr': distinctAbbreviated[k], 'cleaned': distinctCleanedSequence[k]};
            }
          }
        }, err => console.log(err),
        () => {
          if (this.firstLoad) {
            this.firstLoad = false;
          } else {
            this.openCollapsible();
          }
        }
      );
  }

  ngOnDestroy() {
    this.plotFilename$.unsubscribe();
    this.collapsibleOpened$.unsubscribe();
  }

}
