import { Chart } from './chart';
import { View } from './view';
import { ViewDisplay } from './viewDisplay';
import { System } from './system';

export class UserView extends ViewDisplay {
    labSystem: System;

    constructor(id: number, chart: Chart, view: View, row: number, col: number, labSystem: System) {
        super(id, chart, view, row, col);
        this.labSystem = labSystem;
    }
}
