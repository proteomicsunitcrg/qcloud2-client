import { ContextSource} from './contextSource';
export class InstrumentSample extends ContextSource {

    qCCV: string;

    constructor(id: number, name: string, abbreviated: string, qCCV: string, apiKey: string) {
        super(id, name, abbreviated, apiKey);
        this.qCCV = qCCV;
    }
}
