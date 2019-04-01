export class Message {
    title: string;
    message: string;
    type: string;
    show: boolean;
    constructor(title: string, message: string, type: string, show: boolean) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.show = show;
    }
}
