import { Component, OnInit } from '@angular/core';
import { Tip } from '../../../../models/Tip';
import { TipService } from '../../../../services/tip.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {

  constructor(private tipService: TipService) { }

  allTips: Tip[] = [];

  ngOnInit() {
    this.getActiveTips();
  }

  private getActiveTips(): void {
    this.tipService.getAllActiveTips().subscribe(
      res => {
        this.allTips = res;
      },
      err => {
        console.error(err);
      }
    );
  }
}
