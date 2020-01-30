import { SampleType } from './sampleType';
import { System } from './system';

export class File {
    id: number;
    sampleType: SampleType;
    labSystem: System;
    creationDate: Date;
    filename: string;
    checksum: string;
    insertDate: Date;

    constructor(id: number, sampleType: SampleType, system: System,
        creationDate: Date, filename: string, checksum: string, insertDate: Date) {
        this.id = id;
        this.sampleType = sampleType;
        this.labSystem = system;
        this.creationDate = creationDate;
        this.filename = filename;
        this.checksum = checksum;
        this.insertDate = insertDate;
    }
}
