export class GeneralStats {

    public totalFiles: number;
    public filesLast6Months: number;
    public usersWithFiles6Months: number;
    public nodesWithGuidesets: number;
    public labSystemsWithFiles: number;
    public countriesWithFilesLast6Months: number;

    constructor(totalFiles: number, filesLast6Months: number, usersWithFiles6Months: number,
            nodesWithGuidesets: number, labSystemsWithFiles: number, countriesWithFilesLast6Months: number) {
        this.totalFiles = totalFiles;
        this.filesLast6Months = filesLast6Months;
        this.filesLast6Months = filesLast6Months;
        this.usersWithFiles6Months = usersWithFiles6Months;
        this.nodesWithGuidesets = nodesWithGuidesets;
        this.labSystemsWithFiles = labSystemsWithFiles;
        this.countriesWithFilesLast6Months = countriesWithFilesLast6Months;
    }
}