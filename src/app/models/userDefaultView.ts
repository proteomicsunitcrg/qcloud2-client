import { View } from './view';
import { System } from './system';

export class UserDefaultView {

    viewType: string;
    view: View;
    labSystem: System;

    constructor(viewType: string, view: View, labSystem: System) {
        this.viewType = viewType;
        this.view = view;
        this.labSystem = labSystem;
    }
}
