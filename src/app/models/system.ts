import { DataSource } from "./dataSource";

export class System {
    id: number;
    name: string;
    dataSources: DataSource[];

    constructor(id: number,name:string, dataSources: DataSource[]) {
        this.id = id;
        this.name = name;
        this.dataSources = dataSources;
    }
}