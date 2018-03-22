import { Chart } from './chart';

export class LayoutInformation {
    removed: number[][];
    actual: number[][];
    
    constructor(removed: number[][], actual: number[][]) {
        this.removed = removed;
        this.actual = actual;
    }
}