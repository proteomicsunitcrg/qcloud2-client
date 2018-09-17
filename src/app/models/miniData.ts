export class MiniData {
    fileFilename: string;
    fileCreationDate: string;
    contextSourceName: string;
    value: number;
    nonConformityStatus: string;

    constructor(fileFilename: string, fileCreationDate: string, contextSourceName: string, value: number, nonConformityStatus: string) {
        this.fileFilename = fileFilename;
        this.fileCreationDate = fileCreationDate;
        this.contextSourceName = contextSourceName;
        this.value = value;
        this.nonConformityStatus = nonConformityStatus;
    }
}
