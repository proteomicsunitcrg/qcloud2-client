import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'q';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../common/modal.service';
import { GuideSet } from '../../../models/guideSet';
import { GuideSetContextSourceStatus } from '../../../models/guideSetContextSourceStatus';
import { SampleType } from '../../../models/sampleType';
import { System } from '../../../models/system';
import { DataService } from '../../../services/data.service';
import { GuideSetService } from '../../../services/guide-set.service';
import { SystemService } from '../../../services/system.service';
declare var M: any;
@Component({
  selector: 'app-data-source-guide-set-list',
  templateUrl: './data-source-guide-set-list.component.html',
  styleUrls: ['./data-source-guide-set-list.component.css']
})
export class DataSourceGuideSetListComponent implements OnInit, OnDestroy {

  constructor(private systemService: SystemService,
    private modalService: ModalService,
    private guideSetService: GuideSetService,
    private ref: ChangeDetectorRef,
    private dataService: DataService
  ) { }

  systems: System[] = [];

  datePickers: any = [];

  currentGuideSetStatus: GuideSetContextSourceStatus[];

  minFiles: number;
  minValidContextSource: number;
  totalFiles: number;
  selectedAction$: Subscription;
  isValidGuideSet$: Subscription;

  validGuideSet = false;

  editingGuideSet = false;

  ngOnInit() {
    this.getMinFilesForManualGuideSet();
    this.loadSystems();
    this.subscribeToModal();
    this.subscribeToValidGuideSet();
  }
  ngOnDestroy() {
    this.selectedAction$.unsubscribe();
    this.isValidGuideSet$.unsubscribe();
  }

  private subscribeToValidGuideSet(): void {
    this.isValidGuideSet$ = this.guideSetService.isValidGuideSet$
      .subscribe(
        (isValid) => {
          this.validGuideSet = isValid;
          this.refresh();
        }
      );
  }

  private refresh(): void {
    const self = this;
    self.ref.detectChanges();

  }

  private getMinFilesForManualGuideSet(): void {
    this.guideSetService.getMinFilesForManualGuideSet()
      .subscribe(minFiles => {
        this.minFiles = minFiles.body;
        this.minValidContextSource = +minFiles.headers.get('minpoints');
      });
  }

  private loadSystems(): void {
    this.systemService.getSystems()
      .subscribe(
        (systems) => {
          systems.forEach(
            (system) => {
              if (!system.active) {
                return;
              }
              this.systems.push(system);
            }
          );
          this.systems.sort((n1, n2) => n1.id - n2.id);
        }, err => console.log(err),
        () => this.enableDatePickersOnUserDefinedGuideSets()
      );
  }

  private enableDatePickersOnUserDefinedGuideSets(): void {
    this.systems.forEach(
      (system) => {
        system.enabledGuideSets.forEach(
          (gs) => {
            if (gs.isUserDefined) {
              gs.startDate = gs.startDate.slice(0, -6);
              gs.endDate = gs.endDate.slice(0, -6);
              delay(10).then(
                () => {
                  this.initializeDatePickers(system, gs);
                });
            }
          }
        );
      }
    );
  }

  private initializeDatePickers(system: System, guideSet: GuideSet): void {
    const elems = document.querySelectorAll('.datepicker-' + system.apiKey + '-' + guideSet.sampleType.name);
    const options = {
      format: 'yyyy-mm-dd',
      firstDay: 1,
      setDefaultDate: true,
      maxDate: new Date()
    };
    const instances = M.Datepicker.init(elems, options);

    instances.forEach(
      (instance) => {
        instance.options.onClose = () => {
          this.setModelData(instance.el);
          this.checkDates(instance.el);
        };
      }
    );
  }

  private checkDates(element: any): void {
    const labSystemApikey = this.getSystemApikeyFromHtml(element.getAttribute('data-coord'));
    const sampleTypeName = this.getSampleTypeNameFromHtml(element.getAttribute('data-coord'));
    const labSystem = this.systems.find(
      (system) => {
        return system.apiKey === labSystemApikey;
      });
    const guideSet = labSystem.enabledGuideSets.find((gs) => {
      return gs.sampleType.name === sampleTypeName;
    });
    if ((guideSet.startDate !== null) && (guideSet.endDate !== null)) {
      // check if start date is greater than end date
      if (guideSet.startDate > guideSet.endDate) {
        alert('Start date can not be greater than the end date');
      } else {
        // check number of files
        this.guideSetService.checkNumberOfFilesInGuideSet(labSystemApikey, guideSet)
          .subscribe(
            (guideSetPeptideStatus) => {
              this.guideSetService.selectGuideSetContextSourceStatus(guideSetPeptideStatus);
            }, err => console.log(err)
          );
      }
    }
  }

  private setModelData(element: any): void {
    // get the system
    const labSystemApikey = this.getSystemApikeyFromHtml(element.getAttribute('data-coord'));
    const sampleTypeName = this.getSampleTypeNameFromHtml(element.getAttribute('data-coord'));
    const position = element.getAttribute('position');
    // update the system guide set
    const labSystem = this.systems.find(
      (system) => {
        return system.apiKey === labSystemApikey;
      });
    const guideSet = labSystem.enabledGuideSets.find((gs) => {
      return gs.sampleType.name === sampleTypeName;
    });
    switch (position) {
      case 'start':
        guideSet.startDate = element.value;
        break;
      case 'end':
        guideSet.endDate = element.value;
        break;
      default:
        console.log('Wrong position');
        break;
    }

    this.getFilesBetweenDates(labSystemApikey, sampleTypeName, guideSet.startDate, guideSet.endDate, guideSet);
  }

  private getSampleTypeNameFromHtml(htmlId: string): string {
    return htmlId.substring(htmlId.lastIndexOf('-') + 1, htmlId.length);
  }

  private getSystemApikeyFromHtml(htmlId: string): string {
    return htmlId.substring(htmlId.indexOf('-') + 1, htmlId.lastIndexOf('-'));
  }

  private subscribeToModal(): void {
    this.selectedAction$ = this.modalService.selectedAction$
      .subscribe(
        (response) => {
          console.log(response);
        }
      );
  }

  updateSystemGuideSet(system: System, guideSet: GuideSet): void {
    this.systemService.saveGuideSet(system, guideSet)
      .subscribe(
        (res) => {
          console.log(res);
          system = res;
          this.editingGuideSet = false;
          alert('Guideset saved');

        }, err => {
          console.log(err)
          alert(err.error.message)
        }
      );
  }

  createGuideSet(system: System, sampleType: SampleType): void {
    this.editingGuideSet = true;
    const index = system.enabledGuideSets.findIndex(gs => {
      return gs.sampleType.qualityControlControlledVocabulary === sampleType.qualityControlControlledVocabulary;
    });

    system.enabledGuideSets[index].isUserDefined = true;
    system.enabledGuideSets[index].id = null;
    system.enabledGuideSets[index].startDate = null;
    system.enabledGuideSets[index].endDate = null;
    this.refresh();
    this.initializeDatePickers(system, system.enabledGuideSets[index]);
  }

  setGuideSetToAutomatic(labSystem: System, guideSet: GuideSet): void {
    this.guideSetService.resetLabSystemGuideSetBySampleType(labSystem.apiKey, guideSet.sampleType)
      .subscribe(
        (res) => {
          const currentGuideSet = labSystem.enabledGuideSets.find(egs => egs.apiKey === guideSet.apiKey);
          currentGuideSet.apiKey = null;
          currentGuideSet.startDate = null;
          currentGuideSet.endDate = null;
          currentGuideSet.totalFiles = null;
          currentGuideSet.isUserDefined = false;
          this.editingGuideSet = false;
          this.refresh();
        }
      );
  }

  /**
   * refreshNumbers
   */
  private getFilesBetweenDates(systemApiKey: string, guidesetSampleTypeName: string, startDate, endDate, guideSet) {
    this.dataService.getDataBetweenTwoDates(systemApiKey, guidesetSampleTypeName, startDate, endDate).subscribe(
      (res) => {
        guideSet.totalFiles = res;
      }, (error) => {
        console.log(error);
        return 0;
      }
    );
  }
}
