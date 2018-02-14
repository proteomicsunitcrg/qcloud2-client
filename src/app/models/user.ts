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

    constructor(apikey: string, username: string, password: string, firstname: string, lastname: string, email: string) {
        this.apiKey = apikey;
        this.username = username;
        this.password = password;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
}
