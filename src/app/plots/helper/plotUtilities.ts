import { ThresholdParam } from '../../models/thresholdParams';
import * as traceColor from '../plot/traceColors';
import { MiniData } from '../../models/miniData';

export function calculateMean(dataArray: number[]): number {
    let mean = 0;
    let q = 0;
    dataArray.forEach((n) => {
        if (!isNaN(n)) {
            q++;
            mean += n;
        }
    });
    return mean / q;
}

export function getChartName(): string {
    if (this.shownames) {
        return this.system.name + ' ' + this.chart.name + ' ' + this.chart.sampleType.name;
    } else {
        return this.chart.name;
    }
}

export function generateLayoutShapes(thresholdParam: ThresholdParam, thresholdSteps: number): any[] {
    const thresholdColors = ['#a9dbed', '#60c3e8', '#056487'];
    const shapes: any[] = [];
    for (let i = 0; i < thresholdSteps; i++) {
      const shape = {
        type: 'rect',
        x0: 0,
        x1: 1,
        y0: thresholdParam.initialValue + ((i + 1) * thresholdParam.stepValue),
        y1: thresholdParam.initialValue - ((i + 1) * thresholdParam.stepValue),
        xref: 'paper',
        fillcolor: thresholdColors[i],
        opacity: 0.5,
        line: {
          color: 'red',
          width: 0
        },
        layer: 'below'
      };
      shapes.push(shape);
    }
    return shapes;
  }

  export function loadDataAndDatesArray(dataFromServer: MiniData[]): {dates: any[], data: any[], names: any[]} {
    const datesArray = [];
    const dataArray = [];
    const abbreviatedNames = [];
    Object.keys(dataFromServer).forEach(function (key) {
      datesArray.push(key);
      Object.keys(dataFromServer[key]).forEach(
        (element) => {
          if (dataArray[element] === undefined) {
            dataArray[element] = [];
            if (element !== 'filename') {
              abbreviatedNames.push(element);
            }
          }
          dataArray[element].push(dataFromServer[key][element]);
        }
      );
    });
    return {dates: datesArray, data: dataArray, names: abbreviatedNames};
  }

