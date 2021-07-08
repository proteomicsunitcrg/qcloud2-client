export class Tip {
    id: number;
    title: string;
    message: string;
    showAt: Date
    display: boolean;
    publishedTwitter: boolean;
    constructor(title: string, message: string, showAt: Date, display: boolean, publishedTwitter: boolean) {
        this.title = title;
        this.message = message;
        this.display = display;
        this.showAt = showAt;
        this.publishedTwitter= publishedTwitter
    }
}
