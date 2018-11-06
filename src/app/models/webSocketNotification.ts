export class WebSocketNotification {

    action: string;
    apiKey: string;
    qccv: string;
    body: any;

    constructor(action: string, apiKey: string, qccv: string, body: any) {
        this.action = action;
        this.apiKey = apiKey;
        this.qccv = qccv;
        this.body = body;
    }
}
