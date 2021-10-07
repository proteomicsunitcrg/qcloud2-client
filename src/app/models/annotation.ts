import { Troubleshooting } from './troubleshooting';
import { System } from './system';
import { User } from './user';

export class Annotation {
    id: number;
    date: Date;
    apiKey: string;
    description: string;
    labSystem: System;
    user: User;
    troubleshootings: Troubleshooting[];
    note: string;

    constructor(id: number, date: Date, apiKey: string, troubleshooting: Troubleshooting[],
        description: string, labSystem: System, user: User, note: string) {
        this.id = id;
        this.date = date;
        this.apiKey = apiKey;
        this.description = description;
        this.labSystem = labSystem;
        this.user = user;
        this.troubleshootings = troubleshooting;
        this.note = note;
    }
}
