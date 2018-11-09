import { TraceColor } from './TraceColor';
import { PlotTracePoint } from './plotTracePoint';

export class PlotTrace {
    abbreviated: string;
    traceColor: TraceColor;
    shade: number;
    plotTracePoints: PlotTracePoint[];

    constructor(abbreviated: string, traceColor: TraceColor, shade: number, plotTracePoints: PlotTracePoint[]) {
        this.abbreviated = abbreviated;
        this.traceColor = traceColor;
        this.shade = shade;
        this.plotTracePoints = plotTracePoints;
    }
}
