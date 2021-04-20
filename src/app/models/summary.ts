import { Data } from './data';
export class Summary {
  sequence: string;
  values: Data[];

  constructor(sequence: string, values: Data[]) {
    this.sequence = sequence;
    this.values = values
  }
}
