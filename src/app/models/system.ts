import { DataSource } from './dataSource';
import { GuideSet } from './guideSet';

export class System {
    id: number;
    name: string;
    dataSources: DataSource[];
    guideSet: GuideSet;
    apiKey: string;

    constructor(id: number, name: string, dataSources: DataSource[], guideSet: GuideSet, apiKey: string) {
        this.id = id;
        this.name = name;
        this.dataSources = dataSources;
        this.guideSet = guideSet;
        this.apiKey = apiKey;
    }
}
