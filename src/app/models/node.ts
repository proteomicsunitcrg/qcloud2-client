import { User} from './user';
export class Node {
    apikey: string;
    public name: string;
    users: User[];
    constructor(apikey: string, name: string, users: User[]) {
        this.apikey = apikey;
        this.name = name;
        this.users = users;
    }
}
