export class Email {
    from: string;
    to: Array<String>;
    subject: string;
    content: string;
    constructor(from: string, to: Array<String>, subject: string, content: string) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.content = content;
    }
}
