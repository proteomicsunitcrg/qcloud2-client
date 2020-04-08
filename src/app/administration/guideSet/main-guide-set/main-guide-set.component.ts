import { Component, OnInit } from '@angular/core';
import { GuideSetService } from '../../../services/guide-set.service';
import { GuideSet } from '../../../models/guideSet';
import { AutomaticGuideSet } from '../../../models/automaticGuideSet';
declare var M: any;

@Component({
  selector: 'app-main-guide-set',
  templateUrl: './main-guide-set.component.html',
  styleUrls: ['./main-guide-set.component.css']
})
export class MainGuideSetComponent implements OnInit {

  constructor(private guideSetService: GuideSetService) { }

  files: number;

  ngOnInit() {
    this.enableInput();
  }

  private enableInput(): void {
    M.updateTextFields();
  }

  doSetAutomaticGuideSet(): void {
    const gs = new AutomaticGuideSet(null, null, null, null, null, null, null, null, null, this.files);
    this.guideSetService.setAutomaticGuideSet(gs)
      .subscribe(
        (autoGs) => {
          console.log(autoGs);
        }
      );
  }

}
