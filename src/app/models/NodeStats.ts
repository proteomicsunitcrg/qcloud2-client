export class NodeStats {
    totalFiles: number;
    files6Month: number;
    files1Month: number;
    files1Week: number;

    constructor(totalFiles: number, files6Month: number, files1Month: number, files1Week: number) {
        this.totalFiles = totalFiles;
        this.files6Month = files6Month;
        this.files1Month = files1Month;
        this.files1Week = files1Week;
    }
}
