export class MiniData {
    fileFilename: string;
    fileCreationDate: string;
    contextSourceName: string;
    value: number;

    constructor(fileFilename: string, fileCreationDate: string, contextSourceName: string, value: number) {
        this.fileFilename = fileFilename;
        this.fileCreationDate = fileCreationDate;
        this.contextSourceName = contextSourceName;
        this.value = value;
    }
}