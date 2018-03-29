import { Chart } from './chart';
import { View } from './view';

export class ViewDisplay {
    id: number;
    chart: Chart;
    view: View;
    row: number;
    col: number;

    constructor(id:number,chart: Chart, view: View, row: number, col: number) {
        this.id = id;
        this.chart = chart;
        this.view = view;
        this.row = row;
        this.col = col;
    }
}