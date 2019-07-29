import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { delay } from 'q';
import { CommunityLine } from '../../../models/CommunityLine';
import { CV } from '../../../models/cv';
import { Param } from '../../../models/param';
import { SampleType } from '../../../models/sampleType';
import { CategoryService } from '../../../services/category.service';
import { CommunityService } from '../../../services/community.service';
import { CvService } from '../../../services/cv.service';
import { InstrumentSampleService } from '../../../services/instrument-sample.service';
import { ParametersService } from '../../../services/parameters.service';
import { SampleTypeService } from '../../../services/sample-type.service';
import { SampleCompositionService } from '../../../services/sample-composition.service';
import { CommunityPartner } from '../../../models/CommunityPartner';
import { CommunityPartnerService } from '../../../services/community-partner-service';



declare var M: any;

@Component({
  selector: 'app-community-line-builder',
  templateUrl: './community-line-builder.component.html',
  styleUrls: ['./community-line-builder.component.css']
})
export class CommunityLineBuilderComponent implements OnInit {

  constructor(private sampleTypeService: SampleTypeService, private paramService: ParametersService,
    private cvService: CvService, private categoryService: CategoryService,
    private sampleCompositionService: SampleCompositionService,
    private instrumentSampleService: InstrumentSampleService, private communityLineService: CommunityService,
    private partnerService: CommunityPartnerService
  ) { }
  // To store all the sample types
  sampleTypes: SampleType[] = [];

  // To store all parameters
  params: Param[] = [];

  // To store all CVs
  cvs: CV[] = [];

  // To store all CSs
  contextSources: any[];
  
  // To store all partners
  communityPartners: CommunityPartner[] = [];

  // Community Line to build
  communityLine: CommunityLine = new CommunityLine(null, null, null, null, null, null, null, null, null);


  // Output to emit close the form
  @Output() closeFormOutput: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    M.updateTextFields();
    M.AutoInit();
    this.loadSampleTypes();
    this.loadParameters();
    this.getAllPartners();
    this.getCVs();
  }

  /**
   * Load all sample types from the server
   */
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
  /**
   * Load all parameters from the server
   */
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

  /**
   * Retrives the contexts sources by param
   * Launches when the selected param is updated
   * @param {Param} event selected param
   */
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

  /**
   * Get all the enabled MS
   */
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

  /**
   * Get all community partners
   */
  private getAllPartners(): void {
    this.partnerService.getAll().subscribe(
      res => this.communityPartners = res,
      err => console.error(err) 
    );
  }
  /**
   * Submit the new line to the server to save it
   */
  public onSubmit(): void {
    console.log(this.communityLine);
    this.communityLineService.saveCommunityLine(this.communityLine).subscribe(
      (response) => {
        console.log(response);
      }, error => console.error(error)
    );
  }
  
  /**
   * Emits to the parent to close the editor
   */
  public closeForm(): void {
    this.closeFormOutput.emit("close");
  }
}
