import { Troubleshooting } from './troubleshooting';
import { System } from './system';
import { User } from './user';
import { Problem } from './problem';
import { Action } from './action';

export class Annotation {
    id: number;
    date: Date;
    apiKey: string;
    problems: Problem[];
    actions: Action[];
    description: string;
    labSystem: System;
    user: User;

    constructor(id: number, date: Date, apiKey: string, problems: Problem[],
        actions: Action[], description: string, labSystem: System, user: User) {
        this.id = id;
        this.date = date;
        this.apiKey = apiKey;
        this.problems = problems;
        this.actions = actions;
        this.description = description;
        this.labSystem = labSystem;
        this.user = user;
    }
}
