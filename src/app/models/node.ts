import { User} from './user';
export class Node {
    apikey: string;
    public name: string;
    users: User[];
    country: string;

    constructor(apikey: string, name: string, users: User[], country: string) {
        this.apikey = apikey;
        this.name = name;
        this.users = users;
        this.country = country;
    }
}
