import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipService } from '../../../app/services/tip.service';
import { Tip } from '../../../app/models/Tip';
import { ToastrService } from 'ngx-toastr';
import { TOASTSETTING, TOASTSETTINGLONG } from 'src/app/shared/ToastConfig';
declare var M: any;

@Component({
  selector: 'app-tip-of-the-week',
  templateUrl: './tip-of-the-week.component.html',
  styleUrls: ['./tip-of-the-week.component.css']
})
export class TipOfTheWeekComponent implements OnInit {


  messageForm = new FormGroup({
    title: new FormControl('Tip title', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60),
    ]),
    message: new FormControl('Tip text. Type &lt;/br&gt;</br>to breakline'),
    show: new FormControl(false, [
      Validators.required
    ]),
    twitter: new FormControl(false),
  });

  datePickers: any[] = [];

  formDate;

  formHour;

  tip: Tip;

  currentTip: Tip;

  allTips: Tip[] = [];

  constructor(private tipService: TipService, private toastr: ToastrService) { }

  ngOnInit() {
    this.findAllTips();
    this.enableDatePickers();
    this.enableTimePickers();
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
    if (this.messageForm.value.twitter == null) {
      this.messageForm.value.twitter = false;
    }
    const tip = new Tip(this.messageForm.value.title, this.messageForm.value.message, date, this.messageForm.value.show, this.messageForm.value.twitter);
    if (this.currentTip != undefined) {
      tip.id = this.currentTip.id;
    }

    this.tipService.saveTip(tip).subscribe(
      res => {
        this.toastr.success('Tip saved', 'Success', TOASTSETTING);
        this.findAllTips();
      },
      err => {
        this.toastr.error('Error saving the tip', 'Error', TOASTSETTINGLONG);
        console.error(err);
      }
    );
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

  private findAllTips(): void {
    this.tipService.getAllTips().subscribe(
      res => {
        this.allTips = res;
      },
      err => {
        this.toastr.error('Error getting the tips', 'Error', TOASTSETTINGLONG);
        console.error(err);
      }
    );
  }

  /**
  * @summary Updates the form with the retrieved data from th database
  *
  * @author Marc Serret
  * @since 1.0.1
  * @access private
  * @param {Tip} tip The message retrieved from the database
  */
  private mountForm(tip: Tip): void {
    this.messageForm.controls.title.setValue(tip.title);
    this.messageForm.controls.message.setValue(tip.message);
    this.messageForm.controls.show.setValue(tip.display);
    this.messageForm.controls.twitter.setValue(tip.publishedTwitter);
    const endDateInstance = this.datePickers[0];
    endDateInstance.setDate(tip.showAt);
  }


  public goToTip(tip: Tip): void {
    this.mountForm(tip);
    this.currentTip = tip;
  }

  public deleteTip(): void {
    this.tipService.deleteTip(this.currentTip).subscribe(
      res => {
        this.toastr.success('Tip deleted', 'Success', TOASTSETTING);
        this.findAllTips();
      },
      err => {
        this.toastr.error('Error deleting the tip', 'Error', TOASTSETTINGLONG);
        console.error(err);
      }
    );
  }

  public newTip(): void {
    this.currentTip = undefined;
    this.messageForm.controls.title.setValue('');
    this.messageForm.controls.message.setValue('');
    this.messageForm.controls.twitter.setValue(false);
    this.messageForm.controls.show.setValue(false);
  }

}
