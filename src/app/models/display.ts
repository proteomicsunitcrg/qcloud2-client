import { Chart } from './chart';
export class Display {
    charts: Chart[][];
    constructor(charts: Chart[][]) {
        this.charts = charts;
    }
}