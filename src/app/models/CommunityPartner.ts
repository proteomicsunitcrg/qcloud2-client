export class CommunityPartner {
    email: String;
    id: number;
    logo: String;
    name: String;
    webPage: String;

    constructor(email: String, id: number, logo: String, name: String, webPage: String) {
        this.email = email;
        this.id = id;
        this.logo = logo;
        this.name = name;
        this.webPage = webPage
    }
}