import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: string): any {
    if(arg === undefined) return value;
    return value.filter(x => x.title.toLowerCase().includes(arg.toLowerCase()));
  }

}
