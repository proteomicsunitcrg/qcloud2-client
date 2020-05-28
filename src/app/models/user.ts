import { Authority } from './authority';

export class User {
    apiKey: string;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    authorities: Authority[];
    role: string;
    enabled: boolean;
    spam: boolean;
    lastQcrawlerLoginDate: string;

    constructor(apikey: string, username: string, password: string, firstname: string,
        lastname: string, email: string, enabled: boolean, spam: boolean, lastQcrawlerLoginDate: string) {
        this.apiKey = apikey;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.enabled = enabled;
        this.spam = spam;
        this.lastQcrawlerLoginDate = lastQcrawlerLoginDate;
    }
}
