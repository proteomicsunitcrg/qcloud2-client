import { SampleType } from './sampleType';
import { System } from './system';

export class PipelineFile {
    id: number;
    checksum: string;
    filename: string;
    labSystem: System;
    sampleType: SampleType;
    status: string; // 'RECEIVED' | 'PROCESSING' | 'PROCESSED' | 'ERROR'
    receivedDate: Date;
    updatedDate: Date;
    sample: string;
    qcCode: string;
    acquisitionDate: Date;
    instrumentUuid: string;
    databaseName: string;
    sizeMb: number;
    errorReason: string;
}
