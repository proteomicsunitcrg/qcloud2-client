import { PipeTransform, Pipe } from '@angular/core';
import { Threshold } from 'src/app/models/threshold';

@Pipe ({
    name: 'thresholdFilter'
})
export class ThresholdPipe implements PipeTransform{
    transform(thresholds: Threshold[], searchTerm: string): Threshold[] {
        if(!thresholds || !searchTerm) {
            return thresholds;
        }
        thresholds = thresholds.filter(threshold => threshold.cv.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
        return thresholds
    }
}
