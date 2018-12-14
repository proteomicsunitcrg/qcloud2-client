import { Troubleshooting } from './troubleshooting';
import { System } from './system';

export class Annotation {
    id: number;
    date: Date;
    apiKey: string;
    problems: Troubleshooting[];
    actions: Troubleshooting[];
    causes: Troubleshooting[];
    description: string;
    labSystem: System;

    constructor(id: number, date: Date, apiKey: string, problems: Troubleshooting[],
        actions: Troubleshooting[], causes: Troubleshooting[], description: string, labSystem: System) {
        this.id = id;
        this.date = date;
        this.apiKey = apiKey;
        this.problems = problems;
        this.actions = actions;
        this.causes = causes;
        this.description = description;
        this.labSystem = labSystem;
    }
}
