import { Component, OnInit } from '@angular/core';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleType } from '../../../models/sampleType';
import { Param } from '../../../models/param';
import { ParametersService } from '../../../services/parameters.service';
import { delay } from 'q';
import { CvService } from '../../../services/cv.service';
import { CV } from '../../../models/cv';
import { CategoryService } from '../../../services/category.service';
import { CommunityLine } from '../../../models/CommunityLine';
import { ContextSourceService } from '../../../services/context-source.service';
import { ContextSource } from '../../../models/contextSource';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { CommunityService } from '../../../services/community.service';



declare var M: any;

@Component({
  selector: 'app-community-line-builder',
  templateUrl: './community-line-builder.component.html',
  styleUrls: ['./community-line-builder.component.css']
})
export class CommunityLineBuilderComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService, private paramService: ParametersService,
    private cvService: CvService, private categoryService: CategoryService,
    private csService: ContextSourceService, private sampleCompositionService: SampleCompositionService,
    private instrumentSampleService: InstrumentSampleService, private communityLineService: CommunityService
    ) { }

  sampleTypes: SampleType[] = [];
  params: Param[] = [];
  cvs: CV[] = [];
  contextSources: any[];

  communityLine: CommunityLine = new CommunityLine(null, null, null, null, null, null, null, null, null);

  ngOnInit() {
    M.updateTextFields();
    M.AutoInit();
    this.loadSampleTypes();
    this.loadParameters();
    this.getCVs();
  }
  private loadSampleTypes(): void {
    this.sampleTypeService.getSamplesTypes()
      .subscribe(
        (sampleTypes) => {
          this.sampleTypes = sampleTypes;
        }, error => console.log(error),
        () => {
          delay(1).then(() => M.AutoInit());
        }
      );
  }

  private loadParameters(): void {
    this.paramService.getAllParams()
      .subscribe(
        (params) => {
          this.params = params;
          console.log(params);
          
        }, error => console.log(error),
        () => delay(1).then(() => M.AutoInit())
      );
  }

  onParamChange(event: Param) {
    // load contexts sources by sampletype and event
    switch (event.isFor) {
      case 'Peptide':
        this.sampleCompositionService.getAllPeptidesBySampleType(this.communityLine.sampleType)
          .subscribe(
            (peptides) => {
              this.contextSources = peptides;
              console.log(this.contextSources);
            }, error => console.log(error),
            () => delay(1).then(() => M.AutoInit())
            
          );
        break;
      case 'InstrumentSample':
        this.instrumentSampleService.getAllInstrumentSample()
          .subscribe(
            (instrumentSamples) => {
              this.contextSources = instrumentSamples;
              console.log(this.contextSources);
              
            }, err => console.log(err),
            () => delay(1).then(() => M.AutoInit())
          );
        break;
      default:
        console.log(event.isFor);
    }
  }

  private getCVs(): void {
    this.categoryService.getCategoryByName("Mass spectrometer").subscribe(
      (cat) => {
        this.cvService.getAllEnabledCVByCategory(cat).subscribe(
          (cvs) => {
            this.cvs = cvs;
          }, error => console.error(error),
          () => {
            delay(1).then(() => M.AutoInit());
          }
        );
      }, error => console.error(error)
    )
  }

  public onSubmit() {
    console.log(this.communityLine);
    this.communityLineService.saveCommunityLine(this.communityLine).subscribe(
      (response) => {
        console.log(response);
      }, error => console.error(error)
    );
  }
}
