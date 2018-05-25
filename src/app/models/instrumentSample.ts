import { ContextSource} from './contextSource';
export class InstrumentSample extends ContextSource {
    abbreviatedName: string;
    constructor(id: number, name: string, abbreviatedName: string) {
        super(id, name);
        this.abbreviatedName = abbreviatedName;
    }
}
