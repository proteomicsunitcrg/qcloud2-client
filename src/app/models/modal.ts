export class Modal {
    modalHeader: string;
    modalText: string;
    modalYes: string;
    modalNo: string;
    modalAction: string;
    objectInstance: any;
    constructor(modalHeader: string, modalText: string, modalYes: string, modalNo: string, modalAction: string,objectInstance: any) {
        this.modalHeader = modalHeader;
        this.modalText = modalText;
        this.modalYes = modalYes;
        this.modalNo = modalNo;
        this.modalAction = modalAction;
        this.objectInstance = objectInstance;
    }
}
