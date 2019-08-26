import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TraceColor } from '../../../models/TraceColor';
import { TraceColorService } from '../../../services/trace-color.service';
import { ToastrService } from 'ngx-toastr';
import {TOASTSETTING} from '../../../shared/ToastConfig'

declare var Pickr: any;

@Component({
  selector: 'app-color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.css']
})
export class ColorListComponent implements OnInit {

  constructor(private ref: ChangeDetectorRef,
    private traceColorService: TraceColorService,
    private toast: ToastrService) { }

  traceColors: TraceColor[] = [];

  NUMBER_OF_SHADES = 5;


  ngOnInit() {
    this.loadTraceColors();
    this.refresh();
  }
  /**
   * @summary Get all traces colors from the server
   *
   * @author Daniel Mancera
   * @since 1.0.0
   * @access private
   */
  private loadTraceColors(): void {
    this.traceColors = [];
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

  /**
   * @summary Add the retrivet traces to the trace array
   *
   * @author Daniel Mancera
   * @since 1.0.0
   * @access private
   */
  private addTraceColorsToArray(traceColors: TraceColor[]): void {
    traceColors.forEach(
      (traceColor) => {
        this.traceColors.push(new TraceColor(traceColor.mainColor, traceColor.apiKey));
      }
    );
  }

  /**
   * @summary Refresh the list
   *
   * @author Daniel Mancera
   * @since 1.0.0
   * @access private
   */
  private refresh(): void {
    const self = this;
    self.ref.detectChanges();
  }

  /**
   * @summary Initalize all color pickers calling loadPickr
   *
   * @author Daniel Mancera
   * @since 1.0.0
   * @access private
   */
  private initializeColorPickers(): void {
    this.traceColors.forEach(
      (trace, index) => {
        this.loadPickr(trace, index);
      }
    );
  }

  /**
   * @summary Load all color pickers
   * @param {TraceColor} trace to initialize
   * @param {number} index to load
   * @author Daniel Mancera
   * @since 1.0.0
   * @access private
   */
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

  /**
   * @summary Add a new color and color picker to use
   *
   * @author Daniel Mancera
   * @since 1.0.0
   * @access public
   */
  public doAddNewColor(): void {
    const newTraceColor = new TraceColor('rgb(214,24,42)', null);
    this.traceColors.push(newTraceColor);
    this.refresh();
    this.loadPickr(newTraceColor, this.traceColors.length - 1);
  }

  /**
   * @summary Send the new color to the server to save it or uppdates an existing one
   * @param {TraceColor} traceColor to save
   * @author Daniel Mancera
   * @since 1.0.0
   * @access private
   */
  public doSaveColor(traceColor: TraceColor): void {
    if (traceColor.apiKey === null) {
      this.traceColorService.addNewTraceColor(traceColor)
        .subscribe(
          (res) => {
            this.refresh();
            this.loadTraceColors();
            this.toast.success('Color saved', null, TOASTSETTING);
          },
          () => this.toast.error('Error saving the trace', null, TOASTSETTING)
        );
    } else {
      this.traceColorService.updateTraceColor(traceColor)
        .subscribe(
          (res) => {
            this.toast.success('Color updated', null, TOASTSETTING);
          },
          () => this.toast.error('Error saving the trace', null, TOASTSETTING)
        );
    }

  }

  public deleteColor(color: TraceColor) {
    this.traceColorService.deleteTraceColor(color).subscribe(
      (res) => {
        this.toast.success('Color deleted', null, TOASTSETTING);
        this.loadTraceColors();
      },
      (err) => this.toast.error('Error deleting the trace', null, TOASTSETTING)
    );
  }

}
