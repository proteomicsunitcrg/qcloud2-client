import { Pipe, PipeTransform } from '@angular/core';
import { Chart } from '../models/chart';


@Pipe({
  name: 'chartFilter',
  pure: false
})
export class ChartFilterPipe implements PipeTransform {

  transform(items: Chart[], filter: Chart): Chart[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: Chart) => this.applyFilter(item, filter));
  }
  /**
   * Perform the filtering.
   *
   * @param {Chart} chart The chart to compare to the filter.
   * @param {Chart} filter The filter to apply.
   * @return {boolean} True if chart satisfies filters, false if not.
   */
  applyFilter(chart: Chart, filter: Chart): boolean {
    for (const field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (chart[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (chart[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }

}
