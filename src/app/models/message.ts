export class Message {
    title: string;
    message: string;
    type: string;
    show: boolean;
    date: string;
    constructor(title: string, message: string, type: string, show: boolean, date: string) {
        this.title = title;
        this.message = message;
        this.type = type;
        this.show = show;
        this.date = date;
    }
}
