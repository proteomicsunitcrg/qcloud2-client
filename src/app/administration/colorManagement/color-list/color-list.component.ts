import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TraceColor } from '../../../models/TraceColor';
import { TraceColorService } from '../../../services/trace-color.service';

declare var Pickr: any;

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef,
    private traceColorService: TraceColorService) { }

  traceColors: TraceColor[] = [];

  NUMBER_OF_SHADES = 5;


  ngOnInit() {
    this.loadTraceColors();
    this.refresh();
  }

  private loadTraceColors(): void {
    this.traceColorService.getAllTraceColors()
      .subscribe(
        traceColors => this.addTraceColorsToArray(traceColors),
        err => console.log(err),
        () => {
          this.refresh();
          this.initializeColorPickers();
        }
      );
  }

  private addTraceColorsToArray(traceColors: TraceColor[]): void {
    traceColors.forEach(
      (traceColor) => {
        this.traceColors.push(new TraceColor(traceColor.mainColor, traceColor.apiKey));
      }
    );
  }

  private refresh(): void {
    const self = this;
    self.ref.detectChanges();
  }

  private initializeColorPickers(): void {
    this.traceColors.forEach(
      (trace, index) => {
        this.loadPickr(trace, index);
      }
    );
  }

  private loadPickr(trace: TraceColor, index: number): void {
    const pickr = new Pickr({
      el: '#trace' + index,

      default: trace.mainColor,

      components: {
        preview: true,
        hue: true,
        interaction: {
          hex: true,
          input: true,
          clear: true,
          save: true
        }
      },
      strings: {
        save: 'Select',
        clear: 'Clear'
      },
      onSave(hsva, instance) {
        trace.mainColor = hsva.toRGBA().toString();
        trace.updateTraceShades(this.NUMBER_OF_SHADES);
      }
    });
  }

  doAddNewColor(): void {
    const newTraceColor = new TraceColor('rgb(214,24,42)', null);
    this.traceColors.push(newTraceColor);
    this.refresh();
    this.loadPickr(newTraceColor, this.traceColors.length - 1);
  }

  doSaveColor(traceColor: TraceColor): void {
    if (traceColor.apiKey === null) {
      this.traceColorService.addNewTraceColor(traceColor)
        .subscribe(
          (res) => {
            console.log('res', res);
          }
        );
    } else {
      this.traceColorService.updateTraceColor(traceColor)
        .subscribe(
          (res) => {
            console.log('res', res);
          }
        );
    }

  }

}
