import { User } from './user';
import { CV } from './cv';
export class View {
    id: number;
    name: string;
    user: User;
    cv: CV;
    isDefault: boolean;

    constructor(id: number,name:string, user: User,cv:CV, isDefault: boolean) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.cv = cv;
        this.isDefault = isDefault;
    }
}