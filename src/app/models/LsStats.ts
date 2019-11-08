export class LsStats {
    totalFiles: number;
    filesLastMonths: number;

    constructor(totalFiles: number, filesLastMonths: number) {
        this.totalFiles = totalFiles;
        this.filesLastMonths = filesLastMonths;
    }
}