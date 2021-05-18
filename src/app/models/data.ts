import { ContextSource } from "./contextSource";
import { File } from "./file";
import { Param } from "./param";

export class Data {
  calculatedValue: number;

  contextSource: ContextSource;

  file: File;

  nonConformityStatus: string;

  param: Param;

  value: number;

  constructor(calculatedValue: number, contextSource: ContextSource, file: File, nonConformityStatus: string, param: Param, value: number) {
    this.calculatedValue = calculatedValue;
    this.contextSource = contextSource;
    this.file = file;
    this.nonConformityStatus = nonConformityStatus;
    this.param = param;
    this.value = value;
  }
}
