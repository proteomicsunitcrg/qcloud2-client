import { Troubleshooting } from './troubleshooting';
import { System } from './system';
import { User } from './user';
import { Problem } from './problem';
import { Action } from './action';
import { TroubleShootingParent } from './troubleShootingParent';

export class Annotation {
    id: number;
    date: Date;
    apiKey: string;
    problems: Problem[];
    actions: Action[];
    troubleshootingParent: TroubleShootingParent[];
    description: string;
    labSystem: System;
    user: User;

    constructor(id: number, date: Date, apiKey: string, problems: Problem[],
        actions: Action[], troubleshootingParent: TroubleShootingParent[], description: string, labSystem: System, user: User) {
        this.id = id;
        this.date = date;
        this.apiKey = apiKey;
        this.problems = problems;
        this.actions = actions;
        this.troubleshootingParent = troubleshootingParent;
        this.description = description;
        this.labSystem = labSystem;
        this.user = user;
    }
}
