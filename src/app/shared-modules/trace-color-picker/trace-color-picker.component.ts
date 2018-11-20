import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ContextSource } from '../../models/contextSource';
import { TraceColorService } from '../../services/trace-color.service';
import { TraceColor } from '../../models/TraceColor';

@Component({
  selector: 'app-trace-color-picker',
  templateUrl: './trace-color-picker.component.html',
  styleUrls: ['./trace-color-picker.component.css']
})
export class TraceColorPickerComponent implements OnInit {

  constructor(private traceColorService: TraceColorService) { }

  @Input() contextSource: ContextSource;

  traceColors: TraceColor[] = [];

  ngOnInit() {
    this.loadTraceColors();
  }

  private loadTraceColors(): void {
    this.traceColorService.getAllTraceColors()
      .subscribe(
        (traceColors) => {
          this.traceColors = traceColors;
        });
  }

  changeTraceColor(traceColor: TraceColor): void {
    traceColor.updateTraceShades();
    this.contextSource.traceColor = traceColor;
  }
  selectShade(contextSource: ContextSource, shade: number): void {
    contextSource.shadeGrade = shade;
  }

}
