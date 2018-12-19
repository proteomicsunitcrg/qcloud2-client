import { TroubleshootingType } from './troubleshootingType';
import { Troubleshooting } from './troubleshooting';

export interface ItemList {
    type: TroubleshootingType;
    items: Troubleshooting[];
}
