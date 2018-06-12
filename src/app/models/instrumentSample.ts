import { ContextSource} from './contextSource';
export class InstrumentSample extends ContextSource {

    qCCV: string;

    constructor(id: number, name: string, abbreviated: string, qCCV: string) {
        super(id, name, abbreviated);
        this.qCCV = qCCV;
    }
}
