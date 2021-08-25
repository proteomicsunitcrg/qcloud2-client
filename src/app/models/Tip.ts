export class Tip {
    id: number;
    title: string;
    message: string;
    showAt: Date
    display: boolean;
    publishedTwitter: boolean;
    twitterText: string;
    constructor(title: string, message: string, showAt: Date, display: boolean, publishedTwitter: boolean, twitterText: string) {
        this.title = title;
        this.message = message;
        this.display = display;
        this.showAt = showAt;
        this.publishedTwitter= publishedTwitter;
        this.twitterText = twitterText;
    }
}
