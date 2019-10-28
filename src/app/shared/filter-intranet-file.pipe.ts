import { Pipe, PipeTransform } from '@angular/core';
import { File } from '../models/file';

@Pipe({
    name: 'FilePipe'
})
export class FilterIntranetFile {
    transform(items: File[],  name: string){
        if (name  === '' || !name) {
            console.log('yoo');
            
            return items;
        }
        items = items.filter(item => item.filename.toLowerCase().indexOf(name.toLowerCase()) !== -1);
        return items;
    }
}