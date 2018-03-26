import { User } from './user';
export class View {
    id: number;
    name: string;
    user: User;
    isDefault: boolean;

    constructor(id: number,name:string, user: User, isDefault: boolean) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.isDefault = isDefault;
    }
}