export class ModalResponse {
    modalAction: string;
    userAction: string;
    objectInstance: any;
    constructor(modalAction: string, userAction: string, objectInstance: any) {
        this.modalAction = modalAction;
        this.userAction = userAction;
        this.objectInstance = objectInstance;
    }
}
