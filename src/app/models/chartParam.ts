import { Chart } from './chart';
import { ContextSource } from './contextSource';

export class ChartParam {
    chart: Chart;
    contextSource: ContextSource;

    constructor(chart: Chart, contextSource: ContextSource) {
        this.chart = chart;
        this.contextSource = contextSource;
    }
}
