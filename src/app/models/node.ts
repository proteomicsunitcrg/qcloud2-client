import { User} from './user';
export class Node {
    apiKey: string;
    public name: string;
    users: User[];
    country: string;

    constructor(apikey: string, name: string, users: User[], country: string) {
        this.apiKey = apikey;
        this.name = name;
        this.users = users;
        this.country = country;
    }
}
