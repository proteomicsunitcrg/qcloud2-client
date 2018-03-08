import { Chart } from './chart';
import { Param } from './param';
import { ContextSource } from './contextSource';

export class ChartParam {
    chart: Chart;
    param: Param;
    contextSource: ContextSource;

    constructor(chart: Chart, param: Param, contextSource: ContextSource) {
        this.chart = chart;
        this.param = param;
        this.contextSource = contextSource;
    }
}