import { Chart } from './chart';
import { View } from './view';

export class ViewDisplay {
    chart: Chart;
    view: View;
    row: number;
    col: number;

    constructor(chart: Chart, view: View, row: number, col: number) {
        this.chart = chart;
        this.view = view;
        this.row = row;
        this.col = col;
    }
}