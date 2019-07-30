import { ThresholdParam } from '../../models/thresholdParams';
import { MiniData } from '../../models/miniData';

export function calculateMean(dataArray: { 'value': number, 'nc': string }[]): number {
  let mean = 0;
  let q = 0;
  dataArray.forEach((n) => {
    if (!isNaN(n.value)) {
      q++;
      mean += n.value;
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
  const shapes: any[] = [];
  let thresholdColors = [];
  if (thresholdSteps > 1) {
    thresholdColors = ['#056487', '#60c3e8', '#a9dbed'];
  } else {
    thresholdColors = ['#a9dbed'];
  }

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

export function getPointColor(nc: string) {
  const regularColor = 'rgb(51, 102, 204)';
  switch (nc) {
    case 'OK':
      return regularColor;
    case 'WARNING':
      return 'yellow';
    case 'DANGER':
      return 'red';
    default:
      return 'grey';
  }
}

export function getTracePointColor(nc: string, color: string) {
  switch (nc) {
    case 'OK':
      return color;
    case 'WARNING':
      return 'yellow';
    case 'DANGER':
      return 'red';
    default:
      return 'grey';
  }
}

export function loadDataAndDatesArray(dataFromServer: MiniData[]): {
  dates: any[],
  data: { 'value': number, 'nc': string }[], names: any[]
} {
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
        if (element === 'filename') {
          dataArray[element].push(dataFromServer[key][element]);
        } else {
          dataArray[element].push({ 'value': dataFromServer[key][element]['value'], 'nc': dataFromServer[key][element]['nc'] });
        }
        // dataArray[element].push(dataFromServer[key][element]);
      }
    );
  });
  return { dates: datesArray, data: dataArray, names: abbreviatedNames };
}

export function truncateFilename(filename: string, fromCharacter: number): string {
  if (filename.length >= fromCharacter) {
    return filename.substring(0, fromCharacter) + '...';
  } else {
    return filename;
  }
}

export function generateLogo(allLogos: String[], big: boolean): Array<Object> {
  if (big) {
    let images = [];
    let x: number = 1.125;
    for (let logo of allLogos) {
      x = x - 0.06;
      images.push(
        {
          x: x,
          y: 1.05,
          sizex: 0.2,
          sizey: 0.2,
          source: logo,
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        }
      );
    }
    return images;
  } else {
    let images = [];
    let x: number = 1.27;
    for (let logo of allLogos) {
      x = x - 0.15;
      images.push(
        {
          x: x,
          y: 1.05,
          sizex: 0.2,
          sizey: 0.2,
          source: logo,
          xanchor: "right",
          xref: "paper",
          yanchor: "bottom",
          yref: "paper"
        }
      );
    }
    return images;
  }
}

