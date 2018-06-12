import { ContextSource} from './contextSource';
export class InstrumentSample extends ContextSource {
    constructor(id: number, name: string, abbreviated: string) {
        super(id, name, abbreviated);
    }
}
