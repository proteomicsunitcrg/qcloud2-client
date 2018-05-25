import { Pipe, PipeTransform } from '@angular/core';

import { CV } from '../models/cv';
@Pipe({
  name: 'cvFilter',
  pure: false
})
export class CvFilterPipe implements PipeTransform {

  transform(items: CV[], filter: CV): CV[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: CV) => this.applyFilter(item, filter));
  }
  /**
   * Perform the filtering.
   *
   * @param {CV} cv The cv to compare to the filter.
   * @param {CV} filter The filter to apply.
   * @return {boolean} True if cv satisfies filters, false if not.
   */
  applyFilter(cv: CV, filter: CV): boolean {
    for (const field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (cv[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (cv[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }

}
