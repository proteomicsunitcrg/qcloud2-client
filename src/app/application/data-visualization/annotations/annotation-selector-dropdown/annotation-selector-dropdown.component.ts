import { Component, OnInit, Input } from '@angular/core';
import { TroubleshootingService } from '../../../../services/troubleshooting.service';
import { Troubleshooting } from '../../../../models/troubleshooting';

@Component({
  selector: 'app-annotation-selector-dropdown',
  templateUrl: './annotation-selector-dropdown.component.html',
  styleUrls: ['./annotation-selector-dropdown.component.css']
})
export class AnnotationSelectorDropdownComponent implements OnInit {

  constructor(private troubleService: TroubleshootingService) { }


  @Input() type: string;

  troubles: Troubleshooting[];

  ngOnInit() {
    this.getParentsByType();
  }

  private getParentsByType(): void {
    this.troubleService.getParentsByType(this.type).subscribe(
      res => {
        this.troubles = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  public addTroubleshooting(trouble: Troubleshooting): void {
    this.troubleService.sendItemsToList(trouble);
  }

}
