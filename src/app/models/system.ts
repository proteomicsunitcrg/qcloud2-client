import { DataSource } from './dataSource';
import { GuideSet } from './guideSet';

export class System {
    id: number;
    name: string;
    dataSources: DataSource[];
    enabledGuideSets: GuideSet[];
    apiKey: string;

    constructor(id: number, name: string, dataSources: DataSource[], enabledGuideSets: GuideSet[], apiKey: string) {
        this.id = id;
        this.name = name;
        this.dataSources = dataSources;
        this.enabledGuideSets = enabledGuideSets;
        this.apiKey = apiKey;
    }
}
