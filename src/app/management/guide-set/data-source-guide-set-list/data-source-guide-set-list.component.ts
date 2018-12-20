import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { GuideSet } from '../../../models/guideSet';
import { delay } from 'q';
import { ModalService } from '../../../common/modal.service';
import { SystemService } from '../../../services/system.service';
import { System } from '../../../models/system';
import { Subscription } from 'rxjs';
import { GuideSetService } from '../../../services/guide-set.service';
import { SampleType } from '../../../models/sampleType';
import { GuideSetContextSourceStatus } from '../../../models/guideSetContextSourceStatus';
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
    private ref: ChangeDetectorRef) { }

  systems: System[] = [];

  datePickers: any = [];

  currentGuideSetStatus: GuideSetContextSourceStatus[];

  minFiles: number;
  minValidContextSource: number;

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
              this.systems.push(system);
            }
          );
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
              // this.updateGuideSetTotalFiles(guideSet, totalFiles);
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
        }, err => console.log(err)
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
}
