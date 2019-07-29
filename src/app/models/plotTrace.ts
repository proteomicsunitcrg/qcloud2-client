import { TraceColor } from './TraceColor';
import { PlotTracePoint } from './plotTracePoint';
import { CommunityPartner } from './CommunityPartner';

export class PlotTrace {
    abbreviated: string;
    traceColor: TraceColor;
    shade: number;
    plotTracePoints: PlotTracePoint[];
    contextSourceId: number;
    communityPartner: CommunityPartner

    constructor(abbreviated: string, traceColor: TraceColor, shade: number, plotTracePoints: PlotTracePoint[], contextSourceId: number, communityPartner: CommunityPartner) {
        this.abbreviated = abbreviated;
        this.traceColor = traceColor;
        this.shade = shade;
        this.plotTracePoints = plotTracePoints;
        this.contextSourceId = contextSourceId;
        this.communityPartner = communityPartner;
    }
}
