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
import { TraceColorService } from '../../../services/trace-color.service';
import { TraceColor } from '../../../models/TraceColor';
import * as Plotly from 'plotly.js/dist/plotly';
import { ContextSource } from '../../../models/contextSource';

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
    private partnerService: CommunityPartnerService, private traceColorService: TraceColorService
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
  communityLine: CommunityLine = new CommunityLine(null, null, null, null, null, null, null, null, null, null);

  traceColors: TraceColor[] = [];

  collapsibleInstance: any;

  useSameCSColor = false;

  showWarning = false;


  // Output to emit close the form
  @Output() closeFormOutput: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit() {
    M.updateTextFields();
    M.AutoInit();
    this.loadSampleTypes();
    this.loadParameters();
    this.getAllPartners();
    this.getCVs();
    this.loadTraceColors();
    this.drawPlot();
  }

  /**
  * @summary Return all the sample types
  * @author Marc Serret
  * @since 1.0.0
  * @access private
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
  * @summary Return the promise all the parameters
  * @author Marc Serret
  * @since 1.0.0
  * @access private
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
    this.useSameCSColor = false;
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
            }, err => console.log(err),
            () => delay(1).then(() => M.AutoInit())
          );
        break;
      default:
        console.log(event.isFor);
    }
  }

  /**
  * @summary Return all the enabled MS
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  */
  private getCVs(): void {
    this.categoryService.getCategoryByName('Mass spectrometer').subscribe(
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
    );
  }

  /**
  * @summary Return all community partners
  * @author Marc Serret
  * @since 1.0.0
  * @access private
  */
  private getAllPartners(): void {
    this.partnerService.getAll().subscribe(
      res => this.communityPartners = res,
      err => console.error(err)
    );
  }

  /**
  * @summary Sends the line to the server to save it
  * @author Marc Serret
  * @since 1.0.0
  * @access public
  */
  public onSubmit(): void {
    console.log(this.communityLine);
    if (this.communityLine.traceColor === null) {
      alert('Select a color');
    }
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
    this.closeFormOutput.emit('close');
  }

  private loadTraceColors(): void {
    this.traceColorService.getAllTraceColors()
      .subscribe(
        (traceColors) => {
          this.traceColors = traceColors;
        });
  }

  private changeTraceColor(traceColor: TraceColor): void {
    this.communityLine.traceColor = traceColor;
    this.changePlotTraceColor(traceColor.mainColor);
  }

  public useCSColor(): void {
    if (!this.useSameCSColor) {
      this.showWarning = false;
      this.changePlotTraceColor('rgb(0, 98, 255)');
      return;
    }
    console.log(this.communityLine.contextSource.traceColor);

    if (this.communityLine.contextSource.traceColor.mainColor === null) {
      this.showWarning = true;
    } else {
      this.showWarning = false;
      this.changePlotTraceColor(this.communityLine.contextSource.traceColor.mainColor);
      this.communityLine.traceColor = this.communityLine.contextSource.traceColor;
    }
  }

  private changePlotTraceColor(color: string) {
    const trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter'
    };
    const trace2 = {
      x: [1, 4],
      y: [12, 12],
      type: 'scatter',
      mode: 'lines',
      line: { dash: 'dot', color: color }
    };
    const data = [trace1, trace2];
    Plotly.react('plot', data);
  }

  private drawPlot(): void {
    const trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      type: 'scatter'
    };
    const trace2 = {
      x: [1, 4],
      y: [12, 12],
      type: 'scatter',
      mode: 'lines',
      line: { dash: 'dot', color: 'rgb(0, 98, 255)' }
    };
    const data = [trace1, trace2];
    Plotly.newPlot('plot', data);
  }
}
