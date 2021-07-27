import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SystemService } from '../../../services/system.service';
import { Annotation } from '../../../models/annotation';
import { Troubleshooting } from '../../../models/troubleshooting';
import { TroubleshootingService } from '../../../services/troubleshooting.service';
import { System } from '../../../models/system';
import { AnnotationService } from '../../../services/annotation.service';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING } from 'src/app/shared/ToastConfig';
declare var M: any;

@Component({
  selector: 'app-annotations-builder',
  templateUrl: './annotations-builder.component.html',
  styleUrls: ['./annotations-builder.component.css']
})
export class AnnotationsBuilderComponent implements OnInit, OnDestroy {

  constructor(private activeRoute: ActivatedRoute, private troubleshootingService: TroubleshootingService, private lsService: SystemService,
    private annoService: AnnotationService, private toast: ToastrService, private router: Router
    ) { }

  isEdit = false;

  private itemList$: Subscription;

  troubleList: Troubleshooting[] = [];
  datePickers: any[] = [];

  allLs: System[] = [];

  selectedLsApiKey: string = null;

  editingAnno: Annotation = null;


  annotationForm = new FormGroup({
    additional: new FormControl('', [
      Validators.required,
      Validators.maxLength(1000),
    ]),
  });



  ngOnInit() {
        this.activeRoute.params.subscribe(
      params => {
        if (params.apiKey !== 'new') { // editing
          this.isEdit = true;
          this.getAnnotation(params.apiKey);
        } else { //Creating
          this.isEdit = false;
          this.getUserLs();
        }
      },
      err => {
        console.error(err);
      }
    );
    this.subscribeToItemList();
    this.enableDatePickers();
    this.enableTimePickers();
  }


  ngOnDestroy() {
    this.itemList$.unsubscribe();
  }

  private getAnnotation(apiKey: string): void {
    this.annoService.getAnnotationByApiKey(apiKey).subscribe(
      res => {
        this.editingAnno = res;
        this.mountFormEdit(res);
      },
      err => {
        this.toast.error('Annotation not found', 'Error', TOASTSETTING);
        this.router.navigate(['/application/statistics/annotations']);
      }
    );
  }

  private mountFormEdit(annotation: Annotation) {
    this.annotationForm.controls.additional.setValue(annotation.description);
    this.troubleList = annotation.troubleshootings;
    this.selectedLsApiKey = annotation.apiKey;
  }

  private getUserLs(): void {
    this.lsService.getSystems().subscribe(
      res => {
        this.allLs = res;
        setTimeout(() => {  // The timeout is necessary because the select isnt instant
          const select = document.getElementById('lsSelector');
          M.FormSelect.init(select, {});
        }, 1000);
      },
        err => {
          console.error(err);
        }
    );
  }


  private subscribeToItemList(): void {
    this.itemList$ = this.troubleshootingService.itemList$
      .subscribe(
        (list) => {
          this.fillItemList(list);
        }
      );
  }

  private fillItemList(tr: Troubleshooting): void {
    for (const element of this.troubleList) {
      if (element.apiKey === tr.apiKey) {
        return;
      }
    }
    this.troubleList.push(tr);
  }

  public removeFromList(trouble): void {
    this.troubleList.forEach((item, index) => {
      if (item.apiKey === trouble.apiKey) {
        this.troubleList.splice(index, 1);
      }
    });
  }

  private enableDatePickers(): void {
    const datePickers = document.getElementById('date');
    const options = {
      format: 'yyyy-mm-dd',
      firstDay: 1,
      setDefaultDate: true
    }
    const instance = M.Datepicker.init(datePickers, options);
    this.datePickers.push(instance);
  }

  private enableTimePickers(): void {
    const timePicker = document.getElementById('hour');
    const instance = M.Timepicker.init(timePicker);
    this.datePickers.push(instance, { twelveHour: false });
  }

  public submit(): void {
    let date: Date = this.datePickers[0].date
    let min: number;
    let hour: number;
    if (this.datePickers[1].amOrPm == 'PM') {
      min = this.datePickers[1].minutes;
      hour = this.datePickers[1].hours + 12;
      if (hour == 24) {
        hour = 0;
      }
    } else {
      min = this.datePickers[1].minutes;
      hour = this.datePickers[1].hours;
    }
    date.setHours(hour, min);
    let selectedLs: System;
    for (const ls of this.allLs) {
      if (ls.apiKey == this.selectedLsApiKey) {
        selectedLs = ls;
        break;
      }
    }
    const annotation = new Annotation(null, date, null, this.troubleList, this.annotationForm.value.additional, selectedLs, null);
    this.annoService.addAnnotation(annotation).subscribe(
      res => {
        this.toast.success('Annotation saved', 'Success', TOASTSETTING);
        this.router.navigate(['/application/statistics/annotations']);
      },
      err => {
        this.toast.error('Error saving the annotation, contact the admins', 'Error', TOASTSETTING);
        console.error(err);
      }
    );
  }

  public update(): void {
    this.editingAnno.description = this.annotationForm.value.additional;
    this.editingAnno.troubleshootings = this.troubleList;
    this.annoService.addAnnotation(this.editingAnno).subscribe(
      res => {
        this.toast.success('Annotation updated', 'Success', TOASTSETTING);
        this.router.navigate(['/application/statistics/annotations']);
      },
      err => {
        this.toast.error('Error updating the annotation, contact the admins', 'Error', TOASTSETTING);
        console.error(err);
      }
    );
  }

  public goBack(): void {
    this.router.navigate(['/application/statistics/annotations']);
  }

}
